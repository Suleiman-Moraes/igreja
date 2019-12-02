import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Dare } from '../../shared/models/dare.model';
import { DareService } from '../../shared/services/dare.service';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'app-negociacao-list-pagamento-integral',
  templateUrl: './negociacao-list-pagamento-integral.component.html',
  styleUrls: ['./negociacao-list-pagamento-integral.component.css']
})
export class NegociacaoListPagamentoIntegralComponent extends BaseResourceListComponent<Dare>{

  user: Usuario = null;
  ccc: string;
  
  constructor(
    protected dareService: DareService,
    protected injector: Injector
  ){
    super(dareService, injector);
  }

  //PRIVATE METHODS
  protected posNgOnInit(): void {
    this.user = this.authenticationService.currentUserValue.user;
    this.ccc = this.user.pessoaFisica ? (this.user.pessoaFisica.cei.length > 0 ? 
      this.user.pessoaFisica.cei[0].matricula : this.user.pessoaFisica.cpf) : this.user.pessoaJuridica.cnpj;
  }
}
