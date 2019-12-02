import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Debito } from '../../shared/models/debito.model';
import { DebitoService } from '../../shared/services/debito.service';
import { Validators, FormGroup, NgModel } from '@angular/forms';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { PessoaCaduService } from '../../shared/services/pessoa-cadu.service';
import { DebitoDTO } from '../../shared/models/dto/debito-dto.model';
import { OrigemCadastroDebitoEnum } from '../../shared/enums/origem-cadastro-debito.enum';
import { SitucaoDebitoEnum } from '../../shared/enums/situacao-debito.enum';
import { NaturezaDividaDebitoEnum } from '../../shared/enums/natureza-divida-debito.enum';
import { TipoDebito } from '../../shared/models/tipo-debito.model';
import { TipoDebitoService } from '../../shared/services/tipo-debito.service';
import { AreaAtuacao } from '../../shared/models/area-atuacao.model';
import { AreaAtuacaoService } from '../../shared/services/area-atuacao.service';
import { Observer } from 'rxjs';
import { AnexoCADU } from '../../shared/models/cadastrounico/anexoCADU.model';
import { AnexoCADUService } from '../../shared/services/anexo-cadu.service';
import { CADU_SERVICE_API_ANEXO_DOWNLOAD } from '../../shared/dividaativa.api';

@Component({
  selector: 'app-debito-form',
  templateUrl: './debito-form.component.html',
  styleUrls: ['./debito-form.component.css']
})
export class DebitoFormComponent extends BaseResourceFormComponent<Debito>{

  areasDeAtuacao:AreaAtuacao[];
  devedorForm: FormGroup;
  objeto: DebitoDTO = new DebitoDTO();
  id: number = 0;
  listTipoDebitos: TipoDebito[] = new Array();
  display: boolean = false;
  anexosCADU: AnexoCADU[] = new Array();
  tituloModal:string = 'Documentação Validada no Cadastro da Empresa e/ou Renovação da Empresa';

  constructor(
    protected injector: Injector,
    protected debitoService: DebitoService,
    private pessoaCaduService: PessoaCaduService,
    private tipoDebitoService:TipoDebitoService,
    private areaAtuacaoService:AreaAtuacaoService,
    private anexoCADUService:AnexoCADUService,
  ) {
    super(injector, debitoService, Debito.fromJson);
  }

  get origemCadastroOptions(): Array<any> {
    return this.getTypes(Debito.origemCadastrosToCadastro);
  }

  get tipoDebitoOptions(): Array<any> {
    return this.getTypes(Debito.tipoDebitos);
  }

  /*get areaAtuacaoOptions(): Array<any> {
    return this.getTypes(Debito.areaAtuacaos);
  }*/

  get situacaoOptions(): Array<any> {
    return this.getTypes(Debito.situacaos);
  }

  get naturezaOptions(): Array<any> {
    return this.getTypes(Debito.naturezaDividas);
  }

  get naturezaDividaOptions(): Array<any> {
    return this.getTypes(Debito.naturezaDividas);
  }

  submitForm(): void {
    if(!this.resourceForm.get('veiculoRemovido').value){
      this.resourceForm.get('dataRemocaoVeiculo').setValue(null);
    }
    this.beforeSubmitForm();
    this.objeto = DebitoDTO.fromJson(this.resourceForm.value);
    this.objeto.valor = Number((this.objeto.valor + '').replace(/\./, '').replace(',', '.'));
    this.submitFormDtoAux(this.objeto);
  }

  empresaFindByCnpjCpfCei(): void {
    this.pessoaCaduService.findByCnpjCpfCeiNoFilter(this.devedorForm.value.cnpjCpfCei).subscribe(
      (response: ResponseApi) => {
        if (response.data == null) {
          response.erros.forEach(x => {
            this.showError(x);
          });
          if(this.showError.length < 0){
            this.showError('Nenhum Registro encontrado.');
          }
          this.devedorForm.get('id').setValue(null);
        }
        else {
          if (response.data.id == null) {
            this.showError('Nenhum Registro encontrado.');
          }
          this.devedorForm.patchValue(response.data);
        }
      }, err => {
        this.tratarErro(err);
        this.devedorForm.get('id').setValue(null);
      }
    );

    this.anexoCADUService.findAnexosCADU(this.devedorForm.value.cnpjCpfCei).subscribe(
      responseApi=>{
        if(responseApi.data != null){
          this.anexosCADU = responseApi.data;
        }
        else {
          this.anexosCADU = new Array();
        }
      }
    )
  }

  get caduApiAnexoDownload(): string{
    return CADU_SERVICE_API_ANEXO_DOWNLOAD;
  }

  showModal(){
    this.display = !this.display;
  }

  verificarCcc(): boolean{
    return !this.devedorForm.get('cnpjCpfCei').value || (this.devedorForm.get('cnpjCpfCei').value.length != 14
    && this.devedorForm.get('cnpjCpfCei').value.length != 15 && this.devedorForm.get('cnpjCpfCei').value.length != 18);
  }

  getOrigemCadastro(t: string): string {
    return OrigemCadastroDebitoEnum[t];
  }

  getSituacao(t: string): string {
    return SitucaoDebitoEnum[t];
  }

  getTipoDebito(t: number): string {
    return this.listTipoDebitos.filter(tp => {
      return tp.id == t;
    })[0].descricao;
  }

  getAreaAtuacao(t: number): string {
    return this.areasDeAtuacao.filter(a => {
      return a.id == t;
    })[0].descricao;
  }

  getNaturezaDivida(t: string): string {
    return NaturezaDividaDebitoEnum[t];
  }

  invalidDate(){
    this.resourceForm.get('dataRemocaoVeiculo').setValue(null);
  }

  atualizarDataCadastro(): void{
    let value = this.resourceForm.get('origemCadastro').value;
    if(value != 'SISTEMA_S506'){
      this.resourceForm.get('dataCadastro').setValue(new Date());
    }
    else{
      this.resourceForm.get('dataCadastro').setValue(null);
    }
  }

  pasteEventListen(event:ClipboardEvent) {
    let pasteValue = event.clipboardData.getData('Text');
    let observers:any[] = new Array();
    observers.push(this.mudaValue);

    observers.forEach(element => {
      element['listened'](pasteValue, this.resourceForm)
    });
  }

  //PRIVATE METHODS
  protected buildResourceForm(): void {
    this.devedorBuildResourceForm();
    this.resourceForm = this.formBuilder.group({
      id: [null],
      lote: [null, [Validators.maxLength(45)]],
      caixaArquivo: [null, [Validators.maxLength(45)]],
      numeroAutoInfracao: [null, [Validators.maxLength(100)]],
      numeroProcesso: [null, [Validators.required, Validators.maxLength(100)]],
      origemCadastro: [null, [Validators.required]],
      tipoDebito: [null, [Validators.required]],
      areaAtuacao: [null, [Validators.required]],
      situacao: [null, [Validators.required]],
      naturezaDivida: ['', [Validators.required]],
      valor: [null, [Validators.required]],
      dataCadastro: [new Date(), [Validators.required]],
      devedor: this.devedorForm,
      veiculoRemovido:[false],
      dataRemocaoVeiculo:[null]
    });
  }

  protected posNgOnInit(): void {
    this.urlList = '/dividaativa/debito';
    this.id = this.authenticationService.currentUserValue.user.id;
    this.tipoDebitoService.findBySituacao().subscribe(responseApi=>{
      if(responseApi.data != null){
        this.listTipoDebitos = responseApi.data;
      }
    });
    this.areaAtuacaoService.findBySituacao().subscribe(responseApi=>{
      if(responseApi.data != null){
        this.areasDeAtuacao = responseApi.data;
        this.areasDeAtuacao.forEach(area=>{
          if(this.resourceForm.value.areaAtuacao && area.id == this.resourceForm.value.areaAtuacao.id){
            this.resourceForm.get('areaAtuacao').setValue(area);
          }
        })
      }
      else{
        this.erroServidor();
      }
    })
  }

  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Crédito cadastrado com sucesso!');
    }
    else {
      this.toast.success('Crédito atualizado com sucesso!');
    }

    this.router.navigate([this.urlList]);
  }

  protected createPageTitle(): string {
    return 'Novo Crédito';
  }

  protected editionPageTitle(): string {
    return 'Edição de Crédito';
  }

  private devedorBuildResourceForm(): void{
    this.devedorForm = this.formBuilder.group({
      id: [null],
      cnpjCpfCei: ['', [Validators.required, Validators.maxLength(45)]],
      razaoSocialNome: [null],
      inscricaoEstadual: [null],
      telefone: [null],
      email: [null],
      enderecos: [null],
      observacao: [null]
    });
  }

  protected posLoadResource(): void {
    this.resourceForm.get('valor').setValue(this.resourceForm.value.valor + ',00');
    this.resourceForm.get('dataCadastro').setValue(new Date(this.resourceForm.value.dataCadastro.toString()));
  }

  protected loadResource(): void {
    let id: string = '';
    if (this.currentAction == 'edit') {
      id = this.route.snapshot.params['id'];
      this.debitoService.findDtoById(id == '' ? '0' : id).subscribe(
        (responseApi: ResponseApi) => {
          if (responseApi.data == null) {
            responseApi.erros.forEach(x => {
              this.showError(x);
            });
          }
          else {
            this.objeto = responseApi.data;
            this.objeto.dataRemocaoVeiculo = new Date(this.objeto.dataRemocaoVeiculo).toString() == new Date(null).toString() ?
               null : new Date(this.objeto.dataRemocaoVeiculo)
            this.resourceForm.patchValue(this.objeto);            
            this.posLoadResource();
          }
        }, err => {
          this.tratarErro(err);
        }
      );
    }
  }

  getDescricaoSituacao(descricao){
    const valorDescricao = {
      NAO_QUITADO(){ return "Crédito que não inscrito em dívida ativa, parcelado ou quitado."},
      CADASTRO_VALIDADO(){ return "Crédito com checklist validado."},
      CADASTRO_RECUSADO(){ return "Crédito com checklist recusado."},
      PRESCRITO(){ return "Crédito cadastrados a mai de 5 anos e não inscrito em dívida ativa."},
      SUSPENSAO_JUDICIAL(){ return "Crédito em suspensão judicial."},
      ANULADO(){ return "Crédito analudo."},
      QUITADO(){ return "Crédito quitado."},
      INSCRITO_DA_NAO_AJUIZADO(){ return "Crédito inscrito em dívida ativa e não tratado pela execução fiscal."},
      INSCRITO_DA_AJUIZADO_EXECUCAO_FISCAL(){ return "Crédito inscrito em dívida ativa e em tratamento pela execução fiscal."},
      TAC_PARCELAMENTO_ABERTO_VENCER(){ return "Crédito em parcelamento por termo de acordo."},
      TAD_PARCELAMENTO_ABERTO_VENCER(){ return "Crédito em parcelamento por termo de adesão."},
      TAC_PARCELAMENTO_ATRASO_VENCIDAS(){ return "Crédito em parcelamento por termo de acordo, com atraso de pagamento."},
      TAD_PARCELAMENTO_ATRASO_VENCIDAS(){ return "Crédito em parcelamento por termo de adesão, com atraso de pagamento."},
    }

    return valorDescricao[descricao] ? valorDescricao[descricao]() : "";
    //console.log(valorDescricao[descricao]());
  }

  defineNaturezaCredito(valor){
    switch(valor.toString()){
      case '1':
        this.resourceForm.get('naturezaDivida').setValue('NAO_TRIBUTARIA');
        break;
      case '2':
          this.resourceForm.get('naturezaDivida').setValue('TRIBUTARIA');
        break;
      default:
          this.resourceForm.get('naturezaDivida').setValue('');
        break;
    }
  }

  private mudaValue = {
    listened(valorPaste:string, resourceForm){
      let somenteNumeroELetra:boolean = valorPaste.replace(/[1234567890.,]+/,'').length == 0
      let valorOld = resourceForm.get('valor').value;
      let podeMudar:boolean = false;
      let result:string = "";
      if(somenteNumeroELetra){
        valorPaste = valorPaste.replace('.','');
        let valoresVirgula:string[] = valorPaste.split(',');
        result = valoresVirgula[0] + ','+ (valoresVirgula[1] != undefined ? valoresVirgula[1] : '00');
        for(let i = 2; i < valoresVirgula.length; i++ ){
          result += valoresVirgula[i];
        }
      }
      else{
        result = valorOld;
      }
      valorPaste = result;
      resourceForm.get('valor').setValue(result);
    },
  }
}
