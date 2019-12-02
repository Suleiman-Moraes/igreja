import { Component, OnInit, Input } from '@angular/core';
import { DebitoService } from '../../shared/services/debito.service';
import { ConfirmationService } from 'primeng/api';
import { ResponseApi } from 'src/app/shared/models/response-api.model';

@Component({
  selector: 'app-debito-assumir-analise',
  templateUrl: './debito-assumir-analise.component.html',
  styleUrls: ['./debito-assumir-analise.component.css']
})
export class DebitoAssumirAnaliseComponent implements OnInit {

  @Input('usuario-id') usuarioId: number;
  @Input('id') id: number;
  @Input('id-debito') idDebito: number;
  @Input('confirmation-service') confirmationService: ConfirmationService;

  constructor(
    private debitoService: DebitoService
  ) { }

  ngOnInit() {
  }

  assumir(): void{
    this.confirmDialog('Deseja assumir a Análise deste Crédito?', 'Assumir a Análise', 'fa fa-exclamation-triangle');
  }

  analisar(): void{
    this.confirmDialog('Deseja Analisar este Crédito?', 'Analisar Crédito', 'fa fa-exclamation-triangle');
  }

  private confirmDialog(message: string, header: string, icon: string): void {
    this.confirmationService.confirm({
      message: message,
      header: header,
      icon: icon,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.acceptOrRejectConfirmDialog(true);
      },
      reject: () => {
        this.acceptOrRejectConfirmDialog(false);
      }
    });
  }

  private acceptOrRejectConfirmDialog(aceito: boolean): void {
    if(aceito){
      this.debitoService.assumirAnalise(this.idDebito).subscribe(
        (response: ResponseApi) => {
          if (response.data != null) {
            location.reload();
          }
        }
      );
    }
    else{

    }
  }
}
