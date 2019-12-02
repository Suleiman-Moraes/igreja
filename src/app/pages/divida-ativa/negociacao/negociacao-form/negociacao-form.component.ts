import { EdicaoRefisService } from './../../shared/services/edicao-refis.service';
import { Parcela } from './../../shared/models/parcela.model';
import { Usuario } from './../../shared/models/usuario.model';
import { Debito } from './../../shared/models/debito.model';
import { Negociacao } from './../../shared/models/negociacao.model';
import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Validators } from '@angular/forms';
import { NegociacaoService } from '../../shared/services/negociacao.service';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { SitucaoDebitoEnum } from '../../shared/enums/situacao-debito.enum';
import { DebitoService } from '../../shared/services/debito.service';
import { DareService } from '../../shared/services/dare.service';
import { EdicaoRefis } from '../../shared/models/edicao-refis.model';
import { NegociacaoAnexoDTO } from '../../shared/models/dto/negociacao-anexo-dto.model';
import { switchMap } from 'rxjs/operators';
import { Anexo } from '../../shared/models/anexo.model';
import { AnexoService } from '../../shared/services/anexo.service';
import { DIVIDAATIVA_API_NEGOCIACAO_IMPRIMIR } from './../../shared/dividaativa.api';

@Component({
  selector: 'app-negociacao-form',
  templateUrl: './negociacao-form.component.html',
  styleUrls: ['./negociacao-form.component.css']
})
export class NegociacaoFormComponent extends BaseResourceFormComponent<Negociacao>{

  private imprimir: string = DIVIDAATIVA_API_NEGOCIACAO_IMPRIMIR;
  objeto: any = '';
  nego: Negociacao = null;
  dare: any = null;
  edicaoRefis: EdicaoRefis = new EdicaoRefis();
  debitos: any[] = new Array();
  debitoEspecifico: boolean = false;
  debitoNaoNegociavel: boolean = false;
  devedorNaoNegociavel: boolean = false;
  isNotAguarde: boolean = true;
  isAguardandoAprovacaoParcelamento: boolean = false;
  detalhe: any = null;
  escolhidos: any[] = null;
  user: Usuario = new Usuario();
  id = 0;
  debitoNegociacaoPiDTO: any = '';
  tipoNegociacaoAtual: string = null;
  titleDad: string = 'Negociação';
  linkDares: any[] = null;
  isTodosDa: boolean = true;
  tacSimulacaoDTO: any = '';
  negociacaoAnexoDTO: NegociacaoAnexoDTO = new NegociacaoAnexoDTO();

  linkSefaz: string = 'https://app.sefaz.go.gov.br/arr-www/view/exibeDARE.jsf?codigo=';

  maskInter = {
    mask: Number,
    scale: 0,
    thousandsSeparator: '',
    padFractionalZeros: false,
    normalizeZeros: false,
    radix: ',',
    max: 100,
    min: 1
  };

  constructor(
    protected injector: Injector,
    protected negociacaoService: NegociacaoService,
    private debitoService: DebitoService,
    private edicaoRefisService: EdicaoRefisService,
    private anexoService: AnexoService,
    private dareService: DareService
  ) {
    super(injector, negociacaoService, Negociacao.fromJson);
  }

  get hoje(): Date {
    return new Date();
  }

  get listaPar(): any[] {
    return this.tacSimulacaoDTO && this.tacSimulacaoDTO != '' ? new Array(this.tacSimulacaoDTO.numMaxParcelas - 1) : null;
  }

  getImpressaoTAC() {
    let id = this.resource.id;
    return `${this.imprimir}/tac/${id}`;
  }

  getImpressaoRequerimentoParcelamento(){
    let id = this.resource.id;
    return `${this.imprimir}/requerimentoparcelamento/${id}`;
  }

  filterDebitos(): void {
    if (this.resourceForm.value.devedor) {
      this.escolhidos = null;
      this.tipoNegociacaoAtual = null;
      this.tacSimulacaoDTO = '';
      this.resourceForm.get('debitos').setValue([]);
      const debs: Debito[] = this.objeto.debitos;
      this.debitos = debs.filter(d => {
        // return true;
        return d.devedor.cnpjCpfCei == this.resourceForm.value.devedor;
      });
    }
  }

  gerarDares(): void {
    this.dareService.emitirDare(this.resourceForm.get('debitos').value, this.resourceForm.value.dataPagamento).subscribe(
      (response: ResponseApi) => {
        if (response.data != null) {
          this.linkDares = response.data;
          this.findDebitoNegociacaoPiDtoById(this.resourceForm.get('debitos').value);
        }
        else {
          response.erros.forEach(x => {
            this.showError(x);
          });
          this.linkDares = null;
        }
      }, err => {
        this.tratarErro(err);
        this.linkDares = null;
      }
    );
  }

  getLinkDare(id: number): string {
    return this.linkDares.filter(l => {
      return l.id == id;
    })[0].link;
  }

  getValorAtualizado(id: number): string {
    return this.linkDares.filter(l => {
      return l.id == id;
    })[0].valorAtualizado;
  }

  getSituacao(t: string): string {
    return SitucaoDebitoEnum[t];
  }

  onTabOpen(e) {
    var index = e.index;
    this.findDebitoNegociacaoDetalheDtoById(this.debitos[index].id);
  }

  findDebitoNegociacaoDetalheDtoById(id): void {
    if (id != this.id) {
      this.detalhe = null;
      this.debitoService.findDebitoNegociacaoDetalheDtoById(id).subscribe(
        (responseApi: ResponseApi) => {
          if (responseApi.data != null) {
            this.detalhe = responseApi.data;
            this.id = id;
          }
        }, err => {
          this.tratarErro(err);
        }
      );
    }
  }

  carregarDebitos(): void {
    this.isTodosDa = true;
    this.tipoNegociacaoAtual = null;
    this.linkDares = null;
    this.resourceForm.get('tipoNegociacao').setValue(null);
    if (this.resourceForm.value.debitos.length > 0) {
      this.escolhidos = this.debitos.filter(d => {
        if (this.resourceForm.value.debitos.indexOf(d.id) >= 0) {
          if (d.situacao != SitucaoDebitoEnum["Inscrito em DA e não ajuizado"]) {
            this.isTodosDa = false;
          }
          return true;
        }
        else {
          return false;
        }
      });
    }
    else {
      this.escolhidos = null;
    }
  }

  selecionarTipoNegociacao(atual: string) {
    this.confirmDialogTipo(atual);
  }

  atualizarParcela(): void {
    if (this.resource.id) {
      this.negociacaoService.obterProximaParcela(this.resource.id).subscribe(
        (responseApi: ResponseApi) => {
          if (responseApi.data != null) {
            this.resource = responseApi.data;
            this.toast.success('Parcelas Atualizadas com sucesso!');
            this.posLoadResource();
          }
          else {
            responseApi.erros.forEach(x => {
              this.showError(x);
            });
          }
        }, err => {
          this.tratarErro(err);
        }
      );
    }
  }

  atualizarMinParcelas(): void {
    const valor: number = (this.tacSimulacaoDTO.negociacao.valorNegociado - (this.resourceForm.get('entrada').value ?
      Number((this.resourceForm.get('entrada').value + '').replace(/\./, '').replace(',', '.')) : this.tacSimulacaoDTO.valorMinEntradaArredondado));
    let entrada: number = 0;
    for (let i = this.tacSimulacaoDTO.numMaxParcelaBanco - 1; i > 0; i--) {
      entrada = valor / i;
      if (entrada > this.tacSimulacaoDTO.valorMinEntradaBanco) {
        this.tacSimulacaoDTO.numMaxParcelas = i + 1;
        return;
      }
    }
    this.showError('Impossível Parcelamento');
    this.tacSimulacaoDTO = '';
  }

  iniciarSimulacao(): void {
    if (this.resourceForm.value.tipoNegociacao == 'tac') {
      this.negociacaoService.gerarSimulacaoTac(this.resourceForm.value.debitos, this.resourceForm.get('dataPagamento').value).subscribe(
        (responseApi: ResponseApi) => {
          if (responseApi.data != null) {
            this.tacSimulacaoDTO = responseApi.data;
            this.maskMoney.min = this.tacSimulacaoDTO.valorMinEntradaArredondado;
            this.maskMoney.max = this.tacSimulacaoDTO.negociacao.valorNegociado;
            this.maskMoney = {
              mask: Number,
              scale: 2,
              thousandsSeparator: '.',
              padFractionalZeros: true,
              normalizeZeros: true,
              min: this.tacSimulacaoDTO.valorMinEntradaArredondado,
              max: this.tacSimulacaoDTO.negociacao.valorNegociado,
              radix: ','
            };
          }
          else {
            responseApi.erros.forEach(x => {
              this.showError(x);
            });
          }
        }, err => {
          this.tratarErro(err);
        }
      );
    }
    else if (this.resourceForm.value.tipoNegociacao == 'tad') {
      this.negociacaoService.gerarSimulacaoTad(this.resourceForm.value.debitos, this.resourceForm.get('dataPagamento').value,
        this.resourceForm.get('parcela').value).subscribe(
          (responseApi: ResponseApi) => {
            if (responseApi.data != null) {
              this.resource = responseApi.data;
            }
            else {
              responseApi.erros.forEach(x => {
                this.showError(x);
              });
            }
          }, err => {
            this.tratarErro(err);
          }
        );
    }
  }

  isPago(dares: any[]): boolean {
    let achou: boolean = false;
    if (!dares || dares.length == 0) {
      return false;
    }
    dares.forEach(d => {
      if (d && d.dataPagamento) {
        achou = true;
      }
    });
    return achou;
  }

  calcularParcelasNaIntegra(i: number): string {
    const entrada = this.resourceForm.get('entrada').value ? Number((this.resourceForm.get('entrada').value + '').replace(/\./, '').replace(',', '.')) :
      this.tacSimulacaoDTO.valorMinEntradaArredondado;
    this.tacSimulacaoDTO.negociacao.valorNegociado
    let ret: string = (((this.tacSimulacaoDTO.negociacao.valorNegociado - entrada) / i) + '').replace(/\./, ',');
    return ret.substring(0, ret.indexOf(',') + 3);
  }

  salvarTermo(): void {
    if (this.resource.id) {
      this.negociacaoService.atualizarProcessoSeiTermo(this.resource.id, this.resourceForm.value.processoSei).subscribe(
        (responseApi: ResponseApi) => {
          if (responseApi.data != null) {
            this.resource = responseApi.data;
            this.posLoadResource();
            this.toast.success('Número do Processo SEI atualizado com sucesso!');
          }
          else {
            responseApi.erros.forEach(x => {
              this.showError(x);
            });
          }
        }, err => {
          this.tratarErro(err);
        }
      );
    }
  }

  onFileChange(event): void {
    if (event.target.files[0].size > 3000000) {
      this.showError('Tamanho máximo 3 MB');
    } else {
      const file = event.target.files[0];
      let a: Anexo = new Anexo();
      a.bytes = '';
      let nome: string[] = (file.name + '').replace('\.', '#%&#').split('#%&#');
      a.nomeAnexo = file.name;
      const tipoAnexo = nome[nome.length - 1];
      if (this.tipos.indexOf(tipoAnexo) < 0) {
        this.showError('Tipo Inválido');
        return;
      }
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
        a.bytes = reader.result as string;
      }
      reader.readAsDataURL(event.target.files[0]);
      if (this.resourceForm.get('anexos').value == null) {
        this.resourceForm.get('anexos').setValue(new Array());
      }
      this.resourceForm.get('anexos').value.push(a);
    }
  }

  excluir(i): void {
    this.resourceForm.get('anexos').value.splice(i, 1);
  }

  baixar(a: Anexo): void {
    this.download(a.nomeAnexo, a.bytes);
  }

  baixarAnexo(id: number): void {
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

  //METHODS PRIVATE
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      devedor: [null, [Validators.required]],
      tipoNegociacao: [null, [Validators.required]],
      dataPagamento: [null, [Validators.required]],
      entrada: [null, [Validators.required]],
      parcela: [2, [Validators.required]],
      processoSei: [null, [Validators.required]],
      debitos: [new Array()],
      anexos: [new Array()]
    });
  }

  protected setCurrentAction() {
    if (this.route.snapshot.url.length > 1 && this.route.snapshot.url[1].path == "edit") {
      this.currentAction = "edit";
    }
    else {
      this.currentAction = "new";
    }
  }

  protected loadResource(): void {
    if (this.route.snapshot.params.id) {//Edição
      this.loadResourceEdit();
    }
    else {
      let id = this.route.snapshot.queryParams.id;
      id = id ? id : 0;
      let debitoId = this.route.snapshot.queryParams.debitoId;
      debitoId = debitoId ? debitoId : 0;
      let cccParam = this.route.snapshot.queryParams.ccc;
      cccParam = cccParam ? cccParam : null;
      let dareId = this.route.snapshot.queryParams.dareId;
      dareId = dareId ? dareId : null;
      if (dareId) {
        this.dareService.findByIdEspecial(dareId).subscribe(
          (responseApi: ResponseApi) => {
            if (responseApi.data != null) {
              this.dare = responseApi.data;
              this.resourceForm.get('devedor').setValue(this.dare.debito.devedor.cnpjCpfCei);
              this.debitos = [this.dare.debito];
              this.escolhidos = [this.dare.debito];
              this.resourceForm.get('tipoNegociacao').setValue('pi');
              this.acceptOrRejectConfirmDialogTipo(true, 'pi');
              this.resourceForm.get('dataPagamento').setValue(new Date(this.dare.dataVencimento.toString()));
              this.linkDares = [{ id: this.dare.debito.id, link: this.linkSefaz + this.dare.numeroDare, valorAtualizado: this.dare.valor }];
              this.resourceForm.get('debitos').setValue([this.dare.debito.id]);
              this.titleDad = 'Pagamento Integral';
              this.urlList = '/dividaativa/negociacao/pilist';
              const ccc: string = !this.dare.debito ? '-' : this.dare.debito.devedor.cnpjCpfCei;
              if (ccc != '-' && this.validarExterno(ccc)) {
                this.router.navigate(['404']);
              }
            }
            else {
              this.findDtoByIds(cccParam, debitoId, id);
            }
          }, err => {
            this.findDtoByIds(cccParam, debitoId, id);
          }
        );
      }
      else {
        this.findDtoByIds(cccParam, debitoId, id);
      }
    }
  }

  private validarExterno(ccc: string): boolean {
    return (!this.user.usuarioInterno && (!this.user.pessoaJuridica || ccc != this.user.pessoaJuridica.cnpj) &&
      (!this.user.pessoaFisica || ccc != this.user.pessoaFisica.cpf || (this.user.pessoaFisica.cei && this.user.pessoaFisica.cei[0].matricula != ccc)));
  }

  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Negociação criada com sucesso!');
    }
    else {
      this.toast.success('Negociação atualizada com sucesso!');
    }

    this.router.navigate([this.urlList]);
  }

  protected posNgOnInit(): void {
    this.user = this.authenticationService.currentUserValue.user;
    this.urlList = '/dividaativa/negociacao';
    const debitoId = this.route.snapshot.queryParams.debitoId;
    const cccParam = this.route.snapshot.queryParams.ccc;
    const dareId = this.route.snapshot.queryParams.dareId;
    if (!this.user.usuarioInterno) {
      this.urlList = '/dividaativa/debito/externo';
      this.titleDad = 'Meus Créditos';
      if (!debitoId && !cccParam && !dareId && this.currentAction != 'edit') {
        this.router.navigate(['404']);
      }
    }
  }

  protected createPageTitle(): string {
    return 'Realizar Negociação';
  }

  protected editionPageTitle(): string {
    return 'Negociação';
  }

  protected posLoadResource(): void {//apenas para edit
    if (this.resource && this.resource.id) {
      if (this.validarExterno(this.resource.debitos[0].devedor.cnpjCpfCei)) {
        this.router.navigate(['404']);
      }
      this.debitos = this.resource.debitos;
      this.resourceForm.get('devedor').setValue(this.resource.debitos[0].devedor.cnpjCpfCei);
      this.resourceForm.get('debitos').setValue([]);
      this.resource.debitos.forEach((d: Debito) => {
        this.resourceForm.get('debitos').value.push(d.id);
      });
      this.carregarDebitos();
      this.findDebitoNegociacaoPiDtoById(this.resourceForm.value.debitos);
      if (!this.resource.parcelas || this.resource.parcelas.length <= 0) {
        this.isAguardandoAprovacaoParcelamento = true;
      }
      else {
        for (let i = this.resource.parcelas.length; i < this.resource.qtdParcela; i++) {
          this.resource.parcelas.push(new Parcela());
        }
      }
      if (this.resource.termoAcordo && this.resource.termoAcordo.id) {
        this.resourceForm.get('processoSei').setValue(this.resource.termoAcordo.numeroProcesso);
      }
      else if (this.resource.termoAdesao && this.resource.termoAdesao.id) {
        this.resourceForm.get('processoSei').setValue(this.resource.termoAdesao.numeroProcesso);
      }
    }
  }

  private confirmDialogTipo(atual: string): void {
    let message: string = '';
    if (this.resourceForm.value.tipoNegociacao == 'pi') {
      message = 'Deseja realmente realizar o pagamento integral?';
    }
    else if (this.resourceForm.value.tipoNegociacao == 'tac') {
      message = 'Deseja realizar a simulação do termo de acordo do parcelamento?';
    }
    else {
      message = 'Deseja realizar a simulação do termo de adesão (REFIS)?';
    }
    this.confirmationService.confirm({
      message: message,
      header: 'Tipo de Negociação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.acceptOrRejectConfirmDialogTipo(true, atual);
      },
      reject: () => {
        this.acceptOrRejectConfirmDialogTipo(false, atual);
      }
    });
  }

  private acceptOrRejectConfirmDialogTipo(accept: boolean, atual: string) {
    this.debitoNegociacaoPiDTO = '';
    this.tacSimulacaoDTO = '';
    if (accept) {
      this.resourceForm.disabled;
      this.tipoNegociacaoAtual = atual;
      if (this.tipoNegociacaoAtual == 'tad') {
        this.edicaoRefisService.findTopBySituacao().subscribe(
          (responseApi: ResponseApi) => {
            if (responseApi.data != null) {
              this.edicaoRefis = responseApi.data;
              this.maskInter = {
                mask: Number,
                scale: 0,
                thousandsSeparator: '',
                padFractionalZeros: false,
                normalizeZeros: false,
                radix: ',',
                max: Number(this.edicaoRefis.numeroParcela),
                min: 0
              };
            }
          }
        );
      }
    }
    else {
      this.resourceForm.get('tipoNegociacao').setValue(this.tipoNegociacaoAtual);
      if (this.tipoNegociacaoAtual) {
        document.getElementById(this.tipoNegociacaoAtual).click();
      }
    }
  }

  private findDebitoNegociacaoPiDtoById(ids: any[]): void {
    this.debitoService.findDebitoNegociacaoPiDtoById(ids).subscribe(
      (responseApi: ResponseApi) => {
        if (responseApi.data != null) {
          this.debitoNegociacaoPiDTO = responseApi.data;
        }
      }
    );
  }

  protected acceptOrRejectConfirmDialog(aceito: boolean): void {
    if (aceito) {
      if (!this.resourceForm.value.parcela) {
        this.resourceForm.get('parcela').setValue(2);
      }
      if (!this.user.usuarioInterno) {
        this.negociacaoAnexoDTO.anexos = this.resourceForm.value.anexos;
      }
      if (this.tipoNegociacaoAtual == 'tac') {
        const entrada = this.resourceForm.get('entrada').value ? Number((this.resourceForm.get('entrada').value + '').replace(/\./, '').replace(',', '.')) :
          this.tacSimulacaoDTO.valorMinEntradaArredondado;
        this.negociacaoService.gerarTac(this.resourceForm.value.debitos, this.resourceForm.get('dataPagamento').value,
          this.resourceForm.get('parcela').value, entrada, this.negociacaoAnexoDTO).subscribe(
            (responseApi: ResponseApi) => {
              if (responseApi.data != null) {
                this.resource = responseApi.data;
                this.toast.success('Negociação criada com sucesso!');
                this.router.navigate(['/dividaativa/negociacao/' + this.resource.id + '/edit']);
              }
              else {
                responseApi.erros.forEach(x => {
                  this.showError(x);
                });
              }
            }, err => {
              this.tratarErro(err);
            }
          );
      }
      else if (this.tipoNegociacaoAtual == 'tad') {
        this.isNotAguarde = false;
        this.negociacaoService.gerarTad(this.resourceForm.value.debitos, this.resourceForm.get('dataPagamento').value,
          this.resourceForm.get('parcela').value, this.negociacaoAnexoDTO).subscribe(
            (responseApi: ResponseApi) => {
              if (responseApi.data != null) {
                this.resource = responseApi.data;
                this.isNotAguarde = true;
                this.router.navigate(['/dividaativa/negociacao/' + this.resource.id + '/edit']);
              }
              else {
                this.isNotAguarde = true;
                responseApi.erros.forEach(x => {
                  this.showError(x);
                });
              }
            }, err => {
              this.isNotAguarde = true;
              this.tratarErro(err);
            }
          );
      }
    }
  }

  private findDtoByIds(cccParam, debitoId, id): void {
    this.negociacaoService.findDtoByIds(id == '' ? '0' : id, debitoId).subscribe(
      (responseApi: ResponseApi) => {
        if (responseApi.data == null) {
          responseApi.erros.forEach(x => {
            this.showError(x);
          });
        }
        else {
          this.objeto = responseApi.data;
          this.objeto.ate = new Date(this.objeto.ate.toString());
          // this.resourceForm.patchValue(this.objeto);
          if (cccParam) {
            if (this.validarExterno(cccParam)) {
              this.router.navigate(['404']);
            }
            else {
              this.resourceForm.get('devedor').setValue(cccParam);
              this.objeto.devedores = this.objeto.devedores.filter(dev => {
                return dev.cnpjCpfCei == cccParam;
              });
              this.devedorNaoNegociavel = this.objeto.devedores.length <= 0;
              this.filterDebitos();
            }
          }
          else if (debitoId != 0) {
            this.debitoEspecifico = true;
            this.resourceForm.get('debitos').value.push(debitoId);
            const debs: Debito[] = this.objeto.debitos;
            this.debitos = debs.filter(d => {
              return d.id == debitoId;
            });
            this.debitoNaoNegociavel = !this.debitos || this.debitos.length == 0;
            const ccc: string = this.debitos.length == 0 ? '-' : this.debitos[0].devedor.cnpjCpfCei;
            this.resourceForm.get('devedor').setValue(ccc);
            if (ccc != '-' && this.validarExterno(ccc)) {
              this.router.navigate(['404']);
            }
            else if (this.debitoNaoNegociavel) {
              this.negociacaoService.findByDebitosId(debitoId).subscribe(
                (responseApi: ResponseApi) => {
                  if (responseApi.data != null) {
                    this.router.navigate(['/dividaativa/negociacao/' + responseApi.data.id + '/edit']);
                  }
                }
              );
            }
          }


          // Remover depois
          // this.resourceForm.get('devedor').setValue('22.883.619/0001-24');
          // this.filterDebitos();
          // this.resourceForm.get('debitos').setValue([44]);
          // this.carregarDebitos();
          // this.resourceForm.get('tipoNegociacao').setValue('tad');
          // this.acceptOrRejectConfirmDialogTipo(true, 'tad');
          // this.resourceForm.get('parcela').setValue(5);
          // this.resourceForm.get('dataPagamento').setValue(new Date());
          // this.iniciarSimulacao();
          // Remover depois
        }
      }, err => {
        this.tratarErro(err);
      }
    );
  }

  protected loadResourceEdit(): void {
    if (this.currentAction == 'edit') {
      let id: string = '';
      this.route.paramMap.pipe(
        switchMap(params => params.get('id'))
      ).subscribe(
        (param) => {
          id += param;
        }
      );
      this.negociacaoService.buscarNaoExtintoPorId(Number(id)).subscribe(
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
