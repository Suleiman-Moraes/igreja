import { Component, OnInit, Injector } from '@angular/core';
import { SaldoRemanescenteService } from '../../shared/services/saldo-remanescente.service';
import { SaldoRemanescente } from '../../shared/models/saldo-remanescente.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Devedor } from '../../shared/models/devedor.model';
import { DevedorService } from '../../shared/services/devedor.service';

@Component({
  selector: 'app-saldo-remanescente-list',
  templateUrl: './saldo-remanescente-list.component.html',
  styleUrls: ['./saldo-remanescente-list.component.css']
})
export class SaldoRemanescenteListComponent extends BaseResourceListComponent<SaldoRemanescente> {

  devedores:Devedor[] = new Array();

  constructor(
    protected saldoRemanescenteService: SaldoRemanescenteService,
    protected devedorService: DevedorService,
    protected injector: Injector
  ){
    super(saldoRemanescenteService, injector);
  }

  protected findByParams(): void {
    this.saldoRemanescenteService.findByParamsSingle(this.page, this.count).subscribe(
      responseApi => {
        this.tratarResponseApi(responseApi);
        this.paginas.content.forEach(element => {
          this.devedorService.getById(element.devedorId).subscribe(responseApi2=>{
            if(responseApi2.data != null){
              this.devedores.push(responseApi2.data);
            }
            else{
              this.erroServidor();
            }
          });
        });
      }, err => {
        this.tratarErro(err);
      }
    );
  }

  getDevedor(idDevedor:number, field:string): string{
    let valor:string = '';
    this.devedores.forEach(object=>{
      if(object.id == idDevedor){
        if(field == 'razaoSocialNome'){
          valor = object.razaoSocialNome;
        }
        else if(field == 'cnpjCpfCei'){
          valor = object.cnpjCpfCei;
        }
        else if(field == 'telefone'){
          valor = object.telefone;
        }
      }
    });
    return valor;
  }
}
