import { SituacaoEnum } from 'src/app/pages/igreja/shared/enums/situacao.enum';
import { Membro } from './../../../shared/models/membro.model';
import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { MembroService } from '../../../shared/services/membro.service';
import { Validators, FormGroup } from '@angular/forms';
import { EnderecoService } from '../../../shared/services/endereco.service';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-membro-form',
  templateUrl: './membro-form.component.html',
  styleUrls: ['./membro-form.component.css']
})
export class MembroFormComponent extends BaseResourceFormComponent<Membro>{

  enderecoForm: FormGroup;

  constructor(
    protected injector: Injector,
    protected membroService: MembroService,
    private enderecoService: EnderecoService
  ) {
    super(injector, membroService, Membro.fromJson);
  }

  get tipoMembroEnumOptions(): Array<any> {
    return this.getTypes(Membro.tipoMembroEnums);
  }

  buscarEndereco(): void {
    if ((this.enderecoForm.value.cep + '').length == 9) {
      this.enderecoService.obterEnderecoCorreios((this.enderecoForm.value.cep + '').replace('-', '')).subscribe(
        (resource) => {
          if (resource != null) {
            this.enderecoForm.get('rua').setValue(resource.logradouro);
            this.enderecoForm.get('setor').setValue(resource.bairro);
            this.enderecoForm.get('cidade').setValue(resource.localidade);
            this.enderecoForm.get('uf').setValue(resource.uf);
          }
        }
      );
    }
  }

  //METHODS PRIVATE
  protected buildResourceForm(): void {
    this.enderecoForm = this.formBuilder.group({
      id: [null],
      rua: [null],
      quadra: [null],
      lote: [null],
      numero: [null],
      setor: [null],
      cidade: [null],
      uf: [null],
      cep: [null]
    });
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(255)]],
      cpf: [null, [Validators.maxLength(15)]],
      telefone: [null],
      sexo: [true, [Validators.required]],
      situacao: [SituacaoEnum.Ativo, [Validators.required]],
      tipo: [null, [Validators.required]],
      dataNascimento: [null],
      dataInclusao: [null],
      endereco: this.enderecoForm,
      email: [null, [Validators.email, Validators.pattern('[^@]+@.+\..+'), Validators.maxLength(45)]],
      membro: [null, [Validators.required, Validators.maxLength(20)]]
    });
  }

  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Membro criado com sucesso!');
    }
    else {
      this.toast.success('Membro atualizado com sucesso!');
    }

    this.router.navigate([this.urlList]);
  }

  protected posNgOnInit(): void {
    this.urlList = '/pages/cadastro/membro';
  }

  protected createPageTitle(): string {
    return 'Novo Membro';
  }

  protected editionPageTitle(): string {
    return 'Edição de Membro';
  }

  protected loadResource(): void {
    if (this.currentAction == 'edit') {
      let id: string = '';
      this.route.paramMap.pipe(
        switchMap(params => params.get('id'))
      ).subscribe(
        (param) => {
          id += param;
        }
      );
      this.resourceService.getById(Number(id)).subscribe(
        (responseApi: ResponseApi) => {
          if (responseApi.data == null) {
            responseApi.erros.forEach(x => {
              this.showError(x);
            });
          }
          else {
            this.resource = responseApi.data;
            if (this.resource.id == null) {
              this.showError('Nenhum Registro encontrado.');
            }
            if (this.resource.dataNascimento) {
              this.resource.dataNascimento = new Date(this.resource.dataNascimento.toString());
            }
            this.resourceForm.patchValue(this.resource);
            this.posLoadResource();
          }
        }, err => {
          this.tratarErro(err);
        }
      );
    }
  }
}
