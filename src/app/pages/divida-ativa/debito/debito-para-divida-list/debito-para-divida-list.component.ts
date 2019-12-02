import { Component, Injector } from '@angular/core';
import { Debito } from '../../shared/models/debito.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { DebitoService } from '../../shared/services/debito.service';
import { OrigemCadastroDebitoEnum } from '../../shared/enums/origem-cadastro-debito.enum';
import { SitucaoDebitoEnum } from '../../shared/enums/situacao-debito.enum';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-debito-para-divida-list',
  templateUrl: './debito-para-divida-list.component.html',
  styleUrls: ['./debito-para-divida-list.component.css']
})
export class DebitoParaDividaListComponent extends BaseResourceListComponent<Debito>{

  constructor(
    protected debitoService: DebitoService,
    protected injector: Injector,
    private confirmationService: ConfirmationService
  ){
    super(debitoService, injector);
  }

  getOrigemCadastro(t: string): string {
    return OrigemCadastroDebitoEnum[t];
  }

  getSituacao(t: string): string {
    return SitucaoDebitoEnum[t];
  }

  confirmDialog(id): void {
    this.confirmationService.confirm({
      message: 'Deseja realmente inscrever este crédito em Dívida Ativa?',
      header: 'Inscrição em DA',
      icon: 'fa fa-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.acceptOrRejectConfirmDialog(true, id);
      },
      reject: () => {
        this.acceptOrRejectConfirmDialog(false, id);
      }
    });
  }

  //PRIVATE METHODS
  protected findByParams(): void {
    this.debitoService.paginarComParametrosAptosParaInscricaoEmDivida(this.page, this.count).subscribe(
      responseApi => {
        this.tratarResponseApi(responseApi);
      }, err => {
        this.tratarErro(err);
      }
    );
  }

  private acceptOrRejectConfirmDialog(aceito: boolean, id): void {
    if(aceito){
      this.debitoService.insertInDivida(id).subscribe(
        responseApi => {
          if(responseApi.data){
            this.toast.success('Crédito inscrito em Dívida Ativa com sucesso!');
            this.findByParams();
          }
          else{
            this.showError('Não foi possível inscrever o crédito em Dívida');
          }
        }, err => {
          this.tratarErro(err);
        }
      );
    }
    else{

    }
  }
}
