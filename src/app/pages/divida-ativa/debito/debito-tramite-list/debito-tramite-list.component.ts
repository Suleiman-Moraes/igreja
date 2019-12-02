import { Component, Injector } from '@angular/core';
import { Debito } from '../../shared/models/debito.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { DebitoService } from '../../shared/services/debito.service';
import { Usuario } from '../../shared/models/usuario.model';
import { OrigemCadastroDebitoEnum } from '../../shared/enums/origem-cadastro-debito.enum';
import { SitucaoDebitoEnum } from '../../shared/enums/situacao-debito.enum';

@Component({
  selector: 'app-debito-tramite-list',
  templateUrl: './debito-tramite-list.component.html',
  styleUrls: ['./debito-tramite-list.component.css']
})
export class DebitoTramiteListComponent extends BaseResourceListComponent<Debito>{

  title: string = 'Processos';
  subtitle: string = 'Processos';
  sumir: boolean = true;
  user: Usuario = null;

  de: string;
  ate: string;
  ccc: string;
  nai: string;
  np: string;
  rn: string;
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

  getOrigemCadastro(t: string): string {
    return OrigemCadastroDebitoEnum[t];
  }

  getSituacao(t: string): string {
    return SitucaoDebitoEnum[t];
  }

  //PRIVATE METHODS
  protected posNgOnInit(): void {
    this.user = this.authenticationService.currentUserValue.user;
    if((!this.user.usuarioInterno || !this.user.unidade) && this.user.login != 'root'){
      this.router.navigate(['404']);
    }
    this.findByParamsFilter();
  }

  private findByParamsFilter(): void {
    this.debitoService.findByParamsFilter(this.page, this.count, this.de, this.ate,
      this.ccc, this.np, this.rn, this.nai, true, false).subscribe(
        responseApi => {
          this.tratarResponseApi(responseApi);
        }, err => {
          this.tratarErro(err);
        }
      );
  }
}
