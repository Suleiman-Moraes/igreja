import { Usuario } from './../../shared/models/usuario.model';
import { Component, Injector } from '@angular/core';
import { Debito } from '../../shared/models/debito.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { DebitoService } from '../../shared/services/debito.service';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { SitucaoDebitoEnum } from '../../shared/enums/situacao-debito.enum';
import { TipoDebitoEnum } from '../../shared/enums/tipo-debito-debito.enum';
import { AreaAtuacaoDebitoEnum } from '../../shared/enums/area-atuacao-debito.enum';

@Component({
  selector: 'app-debito-detalhe',
  templateUrl: './debito-detalhe.component.html',
  styleUrls: ['./debito-detalhe.component.css']
})
export class DebitoDetalheComponent extends BaseResourceFormComponent<Debito>{

  objeto: Debito = new Debito();
  user: Usuario = new Usuario();
  title: string = 'Meus Créditos';
  // objeto: DebitoDTO = new DebitoDTO();

  constructor(
    protected injector: Injector,
    protected debitoService: DebitoService
  ) {
    super(injector, debitoService, Debito.fromJson);
  }

  getSituacao(t: string): string {
    return SitucaoDebitoEnum[t];
  }

  getTipoDebito(t: any): string {
    return TipoDebitoEnum[t];
  }

  getAreaAtuacaoDebito(t: any): string {
    return AreaAtuacaoDebitoEnum[t];
  }

  //PRIVATE METHODS
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({});
  }

  protected posNgOnInit(): void {
    this.user = this.authenticationService.currentUserValue.user;
    if(this.user.usuarioInterno){
      this.urlList = '/dividaativa/debito/tramite';
      this.title = 'Processos';
    }
    else{
      this.urlList = '/dividaativa/debito/externo';
    }
  }

  protected posSubmitFormSucesso(): void { }

  protected loadResource(): void {
    let id: number = 0;
    id = this.route.snapshot.params['id'];
    this.debitoService.getById(!id ? 0 : id).subscribe(
      (responseApi: ResponseApi) => {
        if (responseApi.data == null) {
          responseApi.erros.forEach(x => {
            this.showError(x);
          });
        }
        else {
          this.objeto = responseApi.data;
          const user: Usuario = this.authenticationService.currentUserValue.user;
          const ccc = user.pessoaFisica ? (user.pessoaFisica.cei.length > 0 ?
            user.pessoaFisica.cei[0].matricula : user.pessoaFisica.cpf) : user.pessoaJuridica.cnpj;
          if (ccc != this.objeto.devedor.cnpjCpfCei) {
            this.router.navigate(['404']);
          }
          this.posLoadResource();
        }
      }, err => {
        this.tratarErro(err);
      }
    );
  }
}
