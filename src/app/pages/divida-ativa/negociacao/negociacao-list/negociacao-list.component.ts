import { Usuario } from './../../shared/models/usuario.model';
import { Negociacao } from './../../shared/models/negociacao.model';
import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { NegociacaoService } from '../../shared/services/negociacao.service';

@Component({
  selector: 'app-negociacao-list',
  templateUrl: './negociacao-list.component.html',
  styleUrls: ['./negociacao-list.component.css']
})
export class NegociacaoListComponent extends BaseResourceListComponent<Negociacao> {

  user: Usuario = new Usuario();
  ccc: string = '';

  constructor(
    protected negociacaoService: NegociacaoService,
    protected injector: Injector
  ){
    super(negociacaoService, injector);
  }

  //PRIVATE METHODS
  protected posNgOnInit(): void {
    this.user = this.authenticationService.currentUserValue.user;
    if(!this.user.usuarioInterno){
      this.ccc = this.user.pessoaJuridica ? this.user.pessoaJuridica.cnpj : this.user.pessoaFisica.cpf;
    }
  }
}
