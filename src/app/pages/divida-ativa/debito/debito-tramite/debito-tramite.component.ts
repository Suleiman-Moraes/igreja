import { DIVIDAATIVA_API_TRAMITE_IMPRIMIR, DIVIDAATIVA_API_DEBITO_IMPRIMIR_TRAMITE, DIVIDAATIVA_API_REGISTROEXTERNO_IMPRIMIR, DIVIDAATIVA_API_DEBITO_BAIXAR_TRAMITE } from './../../shared/dividaativa.api';
import { SituacaoNotificacaoTramite } from './../../shared/models/situacao-notificacao-tramite.model';
import { MensagemPadronizada } from './../../shared/models/mensagem-padronizada.model';
import { MensagemPadronizadaService } from './../../shared/services/mensagem-padronizada.service';
import { Validators, FormGroup } from '@angular/forms';
import { Usuario } from './../../shared/models/usuario.model';
import { Component, Injector, ViewChild } from '@angular/core';
import { Debito } from '../../shared/models/debito.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { SitucaoChecklistDebitoEnum } from '../../shared/enums/situacao-checklist-debito.enum';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { TramiteService } from '../../shared/services/tramite.service';
import { Tramite } from '../../shared/models/tramite.model';
import { UnidadeCaduService } from '../../shared/services/unidade-cadu.service';
import { SituacaoNotificacaoTramiteService } from '../../shared/services/situacao-notificacao-tramite.service';
import { Anexo } from '../../shared/models/anexo.model';
import { AnexoService } from '../../shared/services/anexo.service';
import { RegistroService } from '../../shared/services/registro.service';
import { SituacaoTramiteEnum } from '../../shared/enums/situacao-tramite.enum';
import { RegistroExternoService } from '../../shared/services/registro-externo.service';

@Component({
  selector: 'app-debito-tramite',
  templateUrl: './debito-tramite.component.html',
  styleUrls: ['./debito-tramite.component.css']
})
export class DebitoTramiteComponent extends BaseResourceFormComponent<Tramite>{

  registroForm: FormGroup;
  registroExternoForm: FormGroup;

  objeto: any = '';
  id: number = 0;
  user: Usuario = new Usuario();
  unidade: any = '';
  unidades: any[] = [];
  usuarios: any[] = [];
  usuariosMensagem: any[] = [];
  mensagens: MensagemPadronizada[] = [];
  situacaoNotis: SituacaoNotificacaoTramite[] = [];
  situacaoNotisAr: SituacaoNotificacaoTramite[] = [];
  situacaoNotisArDr: SituacaoNotificacaoTramite[] = [];
  mensagem: MensagemPadronizada = new MensagemPadronizada();;
  display: boolean = false;
  novoTramite: boolean = false;
  novaMensagem: boolean = false;
  novaMensagemExterno: boolean = false;
  title: string = '';
  arsRecebidos: string[] = [];
  publicacoesDiario: string[] = [];
  blockButtonSubmission = false;

  private imprimirDebito: string = DIVIDAATIVA_API_DEBITO_IMPRIMIR_TRAMITE;
  private imprimirTramite: string = DIVIDAATIVA_API_TRAMITE_IMPRIMIR;
  private imprimirExterno: string = DIVIDAATIVA_API_REGISTROEXTERNO_IMPRIMIR;
  private baixarAnexos: string = DIVIDAATIVA_API_DEBITO_BAIXAR_TRAMITE;

  // objeto: DebitoDTO = new DebitoDTO();

  constructor(
    protected injector: Injector,
    protected tramiteService: TramiteService,
    private unidadeCaduService: UnidadeCaduService,
    private situacaoNotificacaoTramiteService: SituacaoNotificacaoTramiteService,
    private mensagemPadronizadaService: MensagemPadronizadaService,
    private registroService: RegistroService,
    private registroExternoService: RegistroExternoService,
    private anexoService: AnexoService
  ) {
    super(injector, tramiteService, Debito.fromJson);
  }

  getSitucaoChecklistDebitoEnum(tipo: string): string {
    return SitucaoChecklistDebitoEnum[tipo];
  }

  getUsuarios(): void{
    this.resourceForm.get('usuario').setValue(null);
    this.unidades.forEach(u => {
      if(u.value == this.resourceForm.value.unidade){
        this.usuarios = u.usuarios;
        return;
      }
    });
  }

  getUrlImpressao(id: number, tipo: string): string{
    if(tipo.toLowerCase() == 'tramite'){
      return `${this.imprimirTramite}/${id}`;
    }
    else if(tipo.toLowerCase() == 'externo'){
      return `${this.imprimirExterno}/${id}`;
    }
    else{
      return `${this.imprimirDebito}/${id}`;
    }
  }

  getUrlBaixarTodosAnexos(id: number): string{
    return `${this.baixarAnexos}/${id}`;
  }

  abrirModal(item: MensagemPadronizada): void{
    this.mensagem = item;
    this.display = true;
  }

  desativaButton(){
    this.blockButtonSubmission = true;
  }

  enviarTrmite(): void{
    this.resourceForm.get('debitoId').setValue(this.objeto.id);
    this.tramiteService.createDTOManul(this.resourceForm.value,this.authenticationService.currentUserValue.user.unidade.id).subscribe(
      (responseApi: ResponseApi) => {
        if (responseApi.data == null) {
          responseApi.erros.forEach(x => {
            this.showError(x);
            this.blockButtonSubmission = false;
          });
        }
        else {
          this.toast.success('Trâmite criado com sucesso!');
          this.novoTramite = false;
          this.novaMensagem = false;
          this.novaMensagemExterno = false;
          this.buildResourceForm();
          this.loadResource();
          this.blockButtonSubmission = false;
        }
      }, err => {
        this.tratarErro(err);
        this.blockButtonSubmission = false;
      }
    );
  }

  enviarMensagem(t: Tramite): void{
    this.registroForm.get('tramite').setValue(t);
    this.registroForm.get('unidade').setValue(this.user.unidade.id == t.unidadeEnviouId ? t.unidadeRecebeuId : t.unidadeEnviouId);
    this.registroService.createDTO(this.registroForm.value).subscribe(
      (responseApi: ResponseApi) => {
        if (responseApi.data == null) {
          responseApi.erros.forEach(x => {
            this.showError(x);
          });
        }
        else {
          this.toast.success('Mensagem enviada com sucesso!');
          this.novaMensagem = false;
          this.novoTramite = false;
          this.novaMensagemExterno = false;
          this.buildResourceForm();
          this.loadResource();
        }
      }, err => {
        this.tratarErro(err);
      }
    );
  }

  enviarMensagemExterno(): void{
    this.registroExternoForm.get('debitoId').setValue(this.objeto.id);
    this.registroExternoService.createDTO(this.registroExternoForm.value).subscribe(
      (responseApi: ResponseApi) => {
        if (responseApi.data == null) {
          responseApi.erros.forEach(x => {
            this.showError(x);
          });
        }
        else {
          this.toast.success('Mensagem enviada com sucesso!');
          this.novaMensagem = false;
          this.novoTramite = false;
          this.novaMensagemExterno = false;
          this.buildResourceForm();
          this.loadResource();
        }
      }, err => {
        this.tratarErro(err);
      }
    );
  }

  getSituacaoTramiteEnum(t: string): string{
    return SituacaoTramiteEnum[t];
  }

  abrirEnviarMensagem(t: Tramite): void{
    this.novaMensagem = true;
    this.novoTramite = false;
    this.novaMensagemExterno = false;
    const id: number = this.user.unidade.id == t.unidadeEnviouId ? t.unidadeRecebeuId : t.unidadeEnviouId;
    this.unidadeCaduService.findNomeIdById(id).subscribe(
      (response: ResponseApi) => {
        if (response.data != null) {
          this.usuariosMensagem = response.data[0].usuarios;
        }
      }
    );
  }

  fecharEnviarMensagem(e): void{
    this.novaMensagem = false;
    this.novoTramite = false;
    this.novaMensagemExterno = false;
  }

  onFileChange(event, form: FormGroup): void{
    if(event.target.files[0].size > 3000000){
      this.showError('Tamanho máximo 3 MB');
    } else {
      const file = event.target.files[0];
      let a: Anexo = new Anexo();
      a.bytes = '';
      let nome: string[] = (file.name + '').replace('\.', '#%&#').split('#%&#');
      a.nomeAnexo = file.name;
      const tipoAnexo = nome[nome.length - 1];
      if(this.tipos.indexOf(tipoAnexo) < 0){
        this.showError('Tipo Inválido');
        return;
      }
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
        a.bytes = reader.result as string;
      }
      reader.readAsDataURL(event.target.files[0]);
      if(form.get('anexos').value == null){
        form.get('anexos').setValue(new Array());
      }
      form.get('anexos').value.push(a);
    }
  }

  excluir(i, form: FormGroup): void{
    form.get('anexos').value.splice(i, 1);
  }

  baixar(a: Anexo): void{
    this.download(a.nomeAnexo, a.bytes);
  }

  baixarAnexo(id: number): void{
    this.anexoService.verAnexo(id).subscribe(
      (response: ResponseApi) => {
        if (response.data != null) {
          this.baixar(response.data);
        }
      }
    );
  }

  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', text);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  colarMensagem(): void{
    if(this.novoTramite){
      this.resourceForm.get('descricao').setValue(this.mensagem.descricao);
    }
    if(this.novaMensagem){
      this.registroForm.get('descricao').setValue(this.mensagem.descricao);
    }
    this.display = false;
  }

  //PRIVATE METHODS
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      unidade: [null, [Validators.required]],
      usuario: [null],
      debitoId: [null, [Validators.required]],
      situacaoNotificacaoTramiteId: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      anexos: [new Array()],
      dataPublicacaoDiarioOficial: [null,[Validators.required]]
    });
    this.registroForm = this.formBuilder.group({
      unidade: [null, [Validators.required]],
      usuario: [null],
      dataRecebimentoAr: [null],
      dataPublicacaoDiarioOficial: [null,[Validators.required]],
      tramite: [null, [Validators.required]],
      situacaoNotificacaoTramiteId: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      anexos: [new Array()]
    });
    this.registroExternoForm = this.formBuilder.group({
      debitoId: [null, [Validators.required]],
      situacaoNotificacaoTramiteId: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      anexos: [new Array()]
    });
  }

  getShowData(r){
    console.log(r.situacaoNotificacaoTramite)
    if(r.situacaoNotificacaoTramite.id == 6){
      console.log(r.dataPublicacaoDiarioOficial);
    }
  }

  liberaDataDiarioOficial(){
    if(this.resourceForm.value.unidade == 21 && 
      (this.resourceForm.value.situacaoNotificacaoTramiteId == 6 || this.resourceForm.value.situacaoNotificacaoTramiteId == 14 
      || this.resourceForm.value.situacaoNotificacaoTramiteId == 22 || this.resourceForm.value.situacaoNotificacaoTramiteId == 36)){
        return true;
    }
    else{
      return false;
    }
  }

  protected posNgOnInit(): void {
    this.user = this.authenticationService.currentUserValue.user;
    if(this.router.url.includes('/dividaativa/debito/execucaofiscal')){
      this.urlList = '/dividaativa/execucaofiscal';
      this.title = 'Execução Fiscal';
    }
    else{
      if(this.user.usuarioInterno){
        if(this.user.unidade.id == 15 || this.user.login == 'root'){
          this.urlList = '/dividaativa/debito';
          this.title = 'Créditos';
        }
        else{
          this.urlList = '/dividaativa/debito/tramite';
          this.title = 'Processos';
        }
      }
      else{
        this.urlList = '/dividaativa/debito/externo';
        this.title = 'Meus Créditos';
      }
    }
    //(user.usuarioInterno ? '' : 'Meus ') + 'Créditos'
    this.id = this.user.id;
  }

  protected posSubmitFormSucesso(): void {
    this.toast.success('Mensagem!');
    this.loadResource();
  }

  protected createPageTitle(): string {
    return 'Trâmite';
  }

  protected editionPageTitle(): string {
    return 'Trâmite';
  }

  protected loadResource(): void {
    let id: string = '';
    id = this.route.snapshot.params['id'];
    if (id) {
      this.tramiteService.findDebitoTramiteDtoByDebitoId(id == '' ? '0' : id).subscribe(
        (responseApi: ResponseApi) => {
          if (responseApi.data == null) {
            responseApi.erros.forEach(x => {
              this.showError(x);
            });
          }
          else {
            this.objeto = responseApi.data;
            // this.objeto.tramites = this.objeto.tramites.filter(t => {
            //   return this.user.unidade.id == t.unidadeEnviouId || this.user.unidade.id == t.unidadeRecebeuId;
            // });
            // this.resourceForm.patchValue(this.objeto);
            // if (this.objeto.origemCadastro != 'SISTEMA_S506' && this.objeto.origemCadastro != 'SEI') {
            //   this.router.navigate(['404']);
            // }
            this.posLoadResource();
          }
        }, err => {
          this.tratarErro(err);
        }
      );
    }
  }

  protected posLoadResource(): void {
    this.unidadeFindNomeIdBySituacaoAndIdNotIn();
    this.mensagemPadronizadaFindBySituacao();
    this.situacaoNotificacaoTramiteFindBySituacao();
    this.unidadeCaduService.findNomeIdById(13).subscribe(
      (response: ResponseApi) => {
        if (response.data != null) {
          this.unidade = response.data[0];
        }
      }
    );
    if(!this.user.usuarioInterno){
      const ccc: string = this.user.pessoaFisica ? (this.user.pessoaFisica.cei.length > 0 ? 
        this.user.pessoaFisica.cei[0].matricula : this.user.pessoaFisica.cpf) : this.user.pessoaJuridica.cnpj;
      if(this.objeto.cnpjCpfCei != ccc){
        this.router.navigate(['404']);
      }
    }
    else{
      if(this.user.unidade.id != 15 || this.objeto.tipoDebito == 'AIT - Auto de Infração de Transporte'){
        let pode: boolean = false;
        this.objeto.tramites.forEach(t => {
          if(this.user.unidade.id == t.unidadeRecebeuId){
            pode = true;
          }
        });
        if(this.router.url.includes('/dividaativa/debito/execucaofiscal') && this.temPermissao('execucaoFISCAL')){
          pode = true;
        }
        if(!pode && this.objeto.usuarioId != this.user.id && this.user.login != 'root'){
          this.router.navigate(['404']);
        }
      }
    }
  }

  private unidadeFindNomeIdBySituacaoAndIdNotIn(): void {
    this.unidadeCaduService.findNomeIdBySituacaoAndIdNotIn(this.user.unidade ? this.user.unidade.id : 0, this.objeto.id).subscribe(
      (response: ResponseApi) => {
        if (response.data != null) {
          this.unidades = response.data;
        }
      }
    );
  }

  private mensagemPadronizadaFindBySituacao(): void {
    this.mensagemPadronizadaService.findBySituacao().subscribe(
      (response: ResponseApi) => {
        if (response.data != null) {
          this.mensagens = response.data;
        }
      }
    );
  }

  private situacaoNotificacaoTramiteFindBySituacao(): void {
    this.situacaoNotificacaoTramiteService.findBySituacao().subscribe(
      (response: ResponseApi) => {
        if (response.data != null) {
          if(this.user.usuarioInterno){
            this.situacaoNotis = response.data;
            this.situacaoNotisAr = response.data.filter(s => {
              return s.descricao.indexOf('Envio de AR') >= 0;
            });
            this.situacaoNotisArDr = response.data.filter(s => {
              if(s.descricao.indexOf('AR Recebido') >= 0){
                this.arsRecebidos.push(s.id + '');
              }
              else if(s.descricao.indexOf('Publicada em Diário Oficial') >= 0){
                this.publicacoesDiario.push(s.id + '');
              }
              return s.descricao.indexOf('AR Recebido') > 0 ||
              s.descricao.indexOf('AR Devolvido') >= 0;
            });
          }
          else{
            this.situacaoNotis = response.data.filter(s => {
              return s.visivelUsuarioExterno;
            });
          }
        }
      }
    );
  }

  temPermissao(per: string): boolean{
    let temPerm:boolean = false;
    this.user.perfis.forEach(perfil=>{
      perfil.permissoes.forEach(permissao=>{
        if(permissao.nome == per){
          temPerm = true;
        }
      });
    });
    return temPerm;
  }
}
