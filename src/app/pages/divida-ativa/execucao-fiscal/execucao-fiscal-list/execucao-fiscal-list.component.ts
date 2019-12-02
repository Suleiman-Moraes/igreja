import { Component, OnInit, Injector, HostListener } from '@angular/core';
import { ExecucaoFiscal } from '../../shared/models/execucao-fiscal.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ExecucaoFiscalService } from '../../shared/services/execucao-fiscal.service';
import { OrigemCadastroDebitoEnum } from '../../shared/enums/origem-cadastro-debito.enum';
import { SitucaoDebitoEnum } from '../../shared/enums/situacao-debito.enum';
import { SituacaoExecucaoFiscalEnum } from '../../shared/enums/situacao-execucao-fiscal.enum';

@Component({
  selector: 'app-execucao-fiscal-list',
  templateUrl: './execucao-fiscal-list.component.html',
  styleUrls: ['./execucao-fiscal-list.component.css']
})
export class ExecucaoFiscalListComponent extends BaseResourceListComponent<ExecucaoFiscal> {

  execucaoFiscal:ExecucaoFiscal[];
  sumir: boolean = true;
  public static time;

  constructor(
    protected execucaoFiscalService: ExecucaoFiscalService,
    protected injector: Injector
  ){
    super(execucaoFiscalService, injector);
  }

  getOrigemCadastro(t: string): string {
    return OrigemCadastroDebitoEnum[t];
  }

  getSituacao(t: string): string {
    return SitucaoDebitoEnum[t];
  }

  getSituacaoExecucaoEnumSearch(t: string): string {
    return SituacaoExecucaoFiscalEnum[t];
  }

  get situacaoExecucaoOptions(): Array<any> {
    return this.getTypes(SituacaoExecucaoFiscalEnum);
  }

  getSituacaoExecucao(id: string): string {
    if(this.execucaoFiscal == undefined) {
      return "";
    }
    let valorFim:string = " - ";
    this.execucaoFiscal.forEach(exec=>{
      if(exec.dividaAtiva.id.toString() == id){
        valorFim = exec.situacao;
      }
    });
    if(valorFim == " - ") {
      return valorFim;
    }
    return SituacaoExecucaoFiscalEnum[valorFim];
  }

  protected findByParams(): void {
    this.paginarUrl();
    return;
  }

  invertSumir(): void {
    this.sumir = !this.sumir;
  }

  @HostListener('window:click') mouse() {
    clearTimeout(ExecucaoFiscalListComponent.time);
    this.setTimeout();
  }

  @HostListener('window:keydown') teclado() {
    clearTimeout(ExecucaoFiscalListComponent.time);
    this.setTimeout();
  }

  limparTime(): void{
    clearTimeout(ExecucaoFiscalListComponent.time);
    ExecucaoFiscalListComponent.time = 0;
  }

  setTimeout() {
    ExecucaoFiscalListComponent.time = setTimeout(() => this.paginarUrl(), 30000);
  }

  pesquisar(): void {
    this.paginarUrl();
  }

  getPaginarUrl(){
    return this.paginarUrl;
  }

  private paginarUrl(): void {
    this.findByParamsFilter();
    this.router.navigate(
      [`/dividaativa/execucaofiscal`],
      { queryParams: { page: this.page, count: this.count, de: this.de, ate: this.ate, ccc: this.ccc, np: this.np, rn: this.rn, nai: this.nai } });
    this.setTimeout();
  }

  de: string;
  ate: string;
  ccc: string;
  nai: string;
  np: string;
  rn: string;
  sit: string;
  //PRIVATE METHODS
  private findByParamsFilter(): void {
    this.execucaoFiscalService.findByParamsFilter(this.page, this.count, this.de, this.ate,
      this.ccc, this.np, this.rn, this.nai, true, this.sit).subscribe(
        responseApi => {
          if (responseApi.data == null) {
            responseApi.erros.forEach(x => {
              this.showError(x);
            });
          }
          else {
            this.paginas = responseApi.data;
            this.pages = new Array(this.paginas.totalPages);
            this.execucaoFiscalService.findInList(this.paginas.content).subscribe(responseApi2=>{
              if (responseApi2.data == null) {
                responseApi2.erros.forEach(x => {
                  this.showError(x);
                });
              }
              else{
                this.execucaoFiscal = responseApi2.data;
              }
            })
          }
        }, err => {
          this.tratarErro(err);
        }
      );
  }
  
}
