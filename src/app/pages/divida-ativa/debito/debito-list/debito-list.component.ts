import { Usuario } from './../../shared/models/usuario.model';
import { Component, Injector, HostListener } from '@angular/core';
import { DebitoService } from '../../shared/services/debito.service';
import { Debito } from '../../shared/models/debito.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ActivatedRoute } from '@angular/router';
import { OrigemCadastroDebitoEnum } from '../../shared/enums/origem-cadastro-debito.enum';
import { SitucaoDebitoEnum } from '../../shared/enums/situacao-debito.enum';
import { DIVIDAATIVA_API_DEBITO_IMPRIMIR } from './../../shared/dividaativa.api';
import { DividaAtivaService } from '../../shared/services/divida-ativa.service';

@Component({
  selector: 'app-debito-list',
  templateUrl: './debito-list.component.html',
  styleUrls: ['./debito-list.component.css']
})
export class DebitoListComponent extends BaseResourceListComponent<Debito>{

  title: string = 'Créditos';
  subtitle: string = 'Créditos';
  sumir: boolean = true;
  public static time;
  user: Usuario = new Usuario();
  
  private imprimirDebito: string = DIVIDAATIVA_API_DEBITO_IMPRIMIR;

  de: string;
  ate: string;
  ccc: string;
  nai: string;
  np: string;
  rn: string;
  hoje: Date = new Date();
  dividaAtiva = new Map();

  constructor(
    protected debitoService: DebitoService,
    protected dividaAtivaService: DividaAtivaService,
    protected injector: Injector,
    private route: ActivatedRoute
  ) {
    super(debitoService, injector);
    this.setTimeout();
  }

  ngOnInit() {
    this.paginas = '';
    if (this.titleService.getTitle() == 'Login') {
      this.titleService.setTitle('Dívida Ativa');
      location.reload();
    }
    if (this.route.snapshot.queryParams.page && this.route.snapshot.queryParams.count) {
      this.page = this.route.snapshot.queryParams.page;
      this.count = this.route.snapshot.queryParams.count;
      this.de = this.route.snapshot.queryParams.de;
      this.ate = this.route.snapshot.queryParams.ate;
      this.ccc = this.route.snapshot.queryParams.ccc;
      this.np = this.route.snapshot.queryParams.np;
      this.rn = this.route.snapshot.queryParams.rn;
      this.nai = this.route.snapshot.queryParams.nai;
      this.findByParamsFilter();
    }
    else {
      this.findByParamsFilter();
    }
    this.posNgOnInit();
    this.hoje.setHours(23);
    this.hoje.setMinutes(59);
    this.hoje.setSeconds(0);
    this.hoje.setMilliseconds(0);
    this.user = this.authenticationService.currentUserValue.user;
    if(!this.user.usuarioInterno || (this.user.login != 'root' && this.user.unidade.id != 15)){
      this.router.navigate(['404']);
    }
  }

  @HostListener('window:click') mouse() {
    clearTimeout(DebitoListComponent.time);
    this.setTimeout();
  }

  @HostListener('window:keydown') teclado() {
    clearTimeout(DebitoListComponent.time);
    this.setTimeout();
  }

  compareDate(data: Date): boolean{
    data = new Date(data.toString());
    data.setHours(23);
    data.setMinutes(59);
    data.setSeconds(0);
    data.setMilliseconds(0);
    return this.hoje <= data;
  }

  limparTime(): void{
    clearTimeout(DebitoListComponent.time);
    DebitoListComponent.time = 0;
  }

  setTimeout() {
    DebitoListComponent.time = setTimeout(() => this.paginarUrl(), 30000);
  }

  paginateParamsRelatorio(event) {
    this.count = event.rows;
    this.page = event.page;
    this.paginarUrl();
    // this.findByParamsFilter();
  }

  pesquisar(): void {
    this.paginarUrl();
  }

  invertSumir(): void {
    this.sumir = !this.sumir;
  }

  getOrigemCadastro(t: string): string {
    return OrigemCadastroDebitoEnum[t];
  }

  getSituacao(t: string): string {
    return SitucaoDebitoEnum[t];
  }

  //PRIVATE METHODS
  private findByParamsFilter(): void {
    this.debitoService.findByParamsFilter(this.page, this.count, this.de, this.ate,
      this.ccc, this.np, this.rn, this.nai, false, true).subscribe(
        responseApi => {
          this.tratarResponseApi(responseApi);
          responseApi.data.content.forEach(element => {
            this.dividaAtivaService.findDebito(element.id).subscribe(response2Api=>{
              if(response2Api.data != null){
                this.dividaAtiva.set(element.id,response2Api.data);
              }
            });
          });
        }, err => {
          this.tratarErro(err);
        }
      );
  }

  protected tratarResponseApi(responseApi): void {
    if (responseApi.data == null) {
      responseApi.erros.forEach(x => {
        this.showError(x);
      });
    }
    else {
      this.paginas = responseApi.data;
    }
  }

  private paginarUrl(): void {
    this.findByParamsFilter();
    this.router.navigate(
      [`/dividaativa/debito`],
      { queryParams: { page: this.page, count: this.count, de: this.de, ate: this.ate, ccc: this.ccc, np: this.np, rn: this.rn, nai: this.nai } });
    this.setTimeout();
  }

  carregaImprime(obj:Debito): boolean{
    return this.getSituacao(obj.situacao).indexOf('Inscrito em DA') > -1 ? true : false;
  }

  getImpressaoCertidaoDeDA(id: number): string{
    return `${this.imprimirDebito}/certidaodividaativa/${id}`;
  }

  carregaImprimeQuitacao(obj:Debito): boolean{
    if(this.getSituacao(obj.situacao) == 'Quitado'){
      if(this.dividaAtiva.has(obj.id)){
        return true;
      }
      return false;
    }
    else{
      return false;
    }
  }

  getImpressaoQuitacaoDeDA(id: number): string{
    return `${this.imprimirDebito}/comprovantequitacao/${id}`;
  }
}
