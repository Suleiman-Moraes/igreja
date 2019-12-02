import { Component, Injector } from '@angular/core';
import { ExecucaoFiscal } from '../../shared/models/execucao-fiscal.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ExecucaoFiscalService } from '../../shared/services/execucao-fiscal.service';
import { Validators } from '@angular/forms';
import { SituacaoExecucaoFiscalEnum } from '../../shared/enums/situacao-execucao-fiscal.enum';
import { switchMap } from 'rxjs/operators';
import { DividaAtiva } from '../../shared/models/divida-ativa.model';
import { OrigemCadastroDebitoEnum } from '../../shared/enums/origem-cadastro-debito.enum';
import { SitucaoDebitoEnum } from '../../shared/enums/situacao-debito.enum';
import { AreaAtuacaoDebitoEnum } from '../../shared/enums/area-atuacao-debito.enum';
import { TipoDebitoEnum } from '../../shared/enums/tipo-debito-debito.enum';
import { NaturezaDividaDebitoEnum } from '../../shared/enums/natureza-divida-debito.enum';
import { Debito } from '../../shared/models/debito.model';
import { SituacaoEnum } from '../../shared/enums/situacao.enum';

@Component({
  selector: 'app-execucao-fiscal-form',
  templateUrl: './execucao-fiscal-form.component.html',
  styleUrls: ['./execucao-fiscal-form.component.css']
})
export class ExecucaoFiscalFormComponent extends BaseResourceFormComponent<ExecucaoFiscal>{

  dividaAtiva:DividaAtiva;
  debito:Debito = new Debito();

  constructor(
    protected injector: Injector,
    protected execucaoFiscalService: ExecucaoFiscalService
  ) {
    super(injector, execucaoFiscalService, ExecucaoFiscal.fromJson);
  }

  protected posNgOnInit(): void {
    this.urlList = '/dividaativa/execucaofiscal';
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      observacao: [null],
      situacao: ['AJUIZADO',Validators.required],
      processo: [null,Validators.required],
      dividaAtiva: [null,Validators.required],
      dataCadastro: [new Date()],
    });
  }

  protected posSubmitFormSucesso(): void {
    this.toast.success('Cadastro atualizado com sucesso!');
    this.router.navigate([this.urlList]);
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
      this.execucaoFiscalService.findId(id).subscribe(
        responseApi=>{
          if(responseApi.data != null){
            if(responseApi.data.dividaAtiva != null && responseApi.data.dividaAtiva != undefined){
              //É uma execução Fiscal
              let execucao:ExecucaoFiscal = responseApi.data;
              this.dividaAtiva = execucao.dividaAtiva;
              this.resourceForm.get('id').setValue(execucao.id);
              this.resourceForm.get('dividaAtiva').setValue(execucao.dividaAtiva);
              this.resourceForm.get('processo').setValue(execucao.processo);
              this.resourceForm.get('situacao').setValue(execucao.situacao);
              this.resourceForm.get('observacao').setValue(execucao.observacao);
              this.resourceForm.get('dataCadastro').setValue(execucao.dataCadastro);
              this.debito = execucao.dividaAtiva.debito;
            }
            else{
              //É uma Divida Ativa
              this.dividaAtiva = responseApi.data;
              this.resourceForm.get('dividaAtiva').setValue(responseApi.data);
              this.debito = responseApi.data.debito;
            }
          }
          else{
            this.erroServidor();
          }
        }
      );
    }
  }
  

  getOrigemCadastro(t: string): string {
    return OrigemCadastroDebitoEnum[t];
  }

  getSituacao(t: string): string {
    return SitucaoDebitoEnum[t];
  }

  getSituacaoExecucaoFiscal(t: string): string {
    return SituacaoExecucaoFiscalEnum[t];
  }

  getTipoDebito(t: string): string {
    return TipoDebitoEnum[t];
  }

  getNaturezaDivida(t: string): string {
    return NaturezaDividaDebitoEnum[t];
  }

  IsNotAGRFiscal(){
    if(this.debito == undefined) return null;
    let value = this.debito.origemCadastro;
    return (value != 'AGR_FISCAL');
  }

  get situacaoExecucaoOptions(): Array<any> {
    return this.getTypes(SituacaoExecucaoFiscalEnum);
  }
}
