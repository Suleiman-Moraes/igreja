import { Usuario } from './../../shared/models/usuario.model';
import { Debito } from './../../shared/models/debito.model';
import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { DebitoService } from '../../shared/services/debito.service';
import { SitucaoDebitoEnum } from '../../shared/enums/situacao-debito.enum';
import { TipoDebitoEnum } from '../../shared/enums/tipo-debito-debito.enum';

@Component({
  selector: 'app-debito-list-externo',
  templateUrl: './debito-list-externo.component.html',
  styleUrls: ['./debito-list-externo.component.css']
})
export class DebitoListExternoComponent extends BaseResourceListComponent<Debito>{

  title: string = 'Meus Créditos';
  subtitle: string = 'Meus Créditos';
  sumir: boolean = true;
  user: Usuario = null;

  de: string;
  ate: string;
  ccc: string;
  nai: string;
  np: string;
  hoje: Date = new Date();

  constructor(
    protected debitoService: DebitoService,
    protected injector: Injector
  ) {
    super(debitoService, injector);
  }

  ngOnInit() {
    this.paginas = '';
    if (this.titleService.getTitle() == 'Login') {
      this.titleService.setTitle('Dívida Ativa');
      location.reload();
    }
    this.posNgOnInit();
  }

  paginateParamsRelatorio(event) {
    this.count = event.rows;
    this.page = event.page;
    this.findByParamsFilter();
  }

  pesquisar(): void {
    this.findByParamsFilter();
  }

  invertSumir(): void {
    this.sumir = !this.sumir;
  }

  getSituacao(t: string): string {
    return SitucaoDebitoEnum[t];
  }

  getTipoDebito(t: string): string {
    return TipoDebitoEnum[t];
  }

  //PRIVATE METHODS
  protected posNgOnInit(): void {
    this.user = this.authenticationService.currentUserValue.user;
    if(this.user.usuarioInterno || (!this.user.pessoaFisica && !this.user.pessoaJuridica)){
      this.router.navigate(['404']);
    }
    this.ccc = this.user.pessoaFisica ? (this.user.pessoaFisica.cei.length > 0 ? 
      this.user.pessoaFisica.cei[0].matricula : this.user.pessoaFisica.cpf) : this.user.pessoaJuridica.cnpj;
    this.findByParamsFilter();
  }

  private findByParamsFilter(): void {
    this.debitoService.findByParamsFilter(this.page, this.count, this.de, this.ate,
      this.ccc, this.np, '', this.nai, false, false).subscribe(
        responseApi => {
          this.tratarResponseApi(responseApi);
        }, err => {
          this.tratarErro(err);
        }
      );
  }
}
