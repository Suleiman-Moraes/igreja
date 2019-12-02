import { DIVIDAATIVA_API_DEBITO_IMPRIMIR } from './../../shared/dividaativa.api';
import { Validators } from '@angular/forms';
import { Component, Injector } from '@angular/core';
import { Debito } from '../../shared/models/debito.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { DebitoService } from '../../shared/services/debito.service';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { SitucaoChecklistDebitoEnum } from '../../shared/enums/situacao-checklist-debito.enum';

@Component({
  selector: 'app-debito-validar',
  templateUrl: './debito-validar.component.html',
  styleUrls: ['./debito-validar.component.css']
})
export class DebitoValidarComponent extends BaseResourceFormComponent<Debito>{

  blocked:boolean
  objeto: any = '';
  id: number = 0;
  // objeto: DebitoDTO = new DebitoDTO();

  constructor(
    protected injector: Injector,
    protected debitoService: DebitoService
  ) {
    super(injector, debitoService, Debito.fromJson);
  }

  get situacaoChecklistOptions(): Array<any> {
    return this.getTypes(Debito.situacaoChecklists);
  }

  get impressao(): string{
    return `${DIVIDAATIVA_API_DEBITO_IMPRIMIR}/${this.route.snapshot.params['id']}`;
  }

  salvar(): void {
    this.debitoService.updateChecklistDto(this.resourceForm.value).subscribe(
      responseApi => {
        this.tratarResponseSubimit(responseApi);
      }, err => {
        this.tratarErro(err);
      }
    );
  }

  getSitucaoChecklistDebitoEnum(tipo: string): string{
    return SitucaoChecklistDebitoEnum[tipo];
  }

  //PRIVATE METHODS
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      numeroProcesso: [null],
      tipoDebito: [null],
      dataCadastro: [null],
      valor: [null],
      situacao: [null],
      cnpjCpfCei: [null],
      razaoSocialNome: [null],
      telefone: [null],
      email: [null],
      logradouro: [null],
      bairro: [null],
      cidade: [null],
      uf: [null],
      cep: [null],
      origemCadastro: [null],
      situacaoChecklist: [null, [Validators.required]],
      checklists: [new Array()],
      itemChecklists: [new Array()]
    });
  }

  protected posNgOnInit(): void {
    this.urlList = '/dividaativa/debito';
    this.id = this.authenticationService.currentUserValue.user.id;
  }

  protected posSubmitFormSucesso(): void {
    this.toast.success(SitucaoChecklistDebitoEnum[this.resourceForm.value.situacaoChecklist] + ' com sucesso!');
    this.loadResource();
  }

  protected createPageTitle(): string {
    return 'Validar Crédito';
  }

  protected editionPageTitle(): string {
    return 'Validar Crédito';
  }

  protected loadResource(): void {
    let id: string = '';
    id = this.route.snapshot.params['id'];
    this.debitoService.findChecklistDtoById(id == '' ? '0' : id).subscribe(
      (responseApi: ResponseApi) => {
        if (responseApi.data == null) {
          responseApi.erros.forEach(x => {
            this.showError(x);
          });
        }
        else {
          this.objeto = responseApi.data;
          this.resourceForm.patchValue(this.objeto);
          if (this.objeto.origemCadastro != 'SISTEMA_S506' && this.objeto.origemCadastro != 'SEI') {
            this.router.navigate(['404']);
          }
          this.posLoadResource();
        }
      }, err => {
        this.tratarErro(err);
      }
    );
  }

  protected posLoadResource(): void {
    if(this.resourceForm.value.id != null && this.resourceForm.value.checklists && this.resourceForm.value.situacaoChecklist){
      this.blocked = true;
    }
    else{
      this.blocked = false;
    }
  }

  habilitaEdit(){
    this.blocked = !this.blocked;
  }

  verificaValidade(objeto:any, location?:string):boolean{
    if((objeto.situacaoDebito != 'CADASTRO_RECUSADO' && objeto.situacaoChecklist == 'DOCUMENTACAO_VALIDADA') || !objeto.usuarioId || objeto.usuarioId != this.id){
      return true;
    }
    return this.blocked;
  }
}
