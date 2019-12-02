import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { IndiceIGPDI } from '../../shared/models/IndiceIGPDI.model';
import { IndiceIGPDIService } from '../../shared/services/IndiceIGPDI.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-indice-igpdi-list',
  templateUrl: './indice-igpdi-list.component.html',
  styleUrls: ['./indice-igpdi-list.component.css']
})
export class IndiceIgpdiListComponent extends BaseResourceListComponent<IndiceIGPDI> {

  id:number;
  mesAno:string;
  indiceMes:string;
  multiplicadorIgpdi:string;
  coeficienteAcumulado:string;
  sumir:boolean = true;
  mes:SelectItem[];
  ano:SelectItem[] = new Array();
  mesSelected:string;
  anoSelected:string;

  constructor(
    protected indiceIGPDIService: IndiceIGPDIService,
    protected injector: Injector
  ){
    super(indiceIGPDIService, injector);
    this.mes = [
      {label:'Escolha um mês', value:null},
      {label:'Janeiro', value: 'Janeiro'},
      {label:'Fevereiro', value: 'Fevereiro'},
      {label:'Março', value: 'Março'},
      {label:'Abril', value: 'Abril'},
      {label:'Maio', value: 'Maio'},
      {label:'Junho', value: 'Junho'},
      {label:'Julho', value: 'Julho'},
      {label:'Agosto', value: 'Agosto'},
      {label:'Setembro', value: 'Setembro'},
      {label:'Outubro', value: 'Outubro'},
      {label:'Novembro', value: 'Novembro'},
      {label:'Dezembro', value: 'Dezembro'}
    ];
    let anoAux = new Date().getFullYear();
    this.ano.push({label:'Escolha um ano', value:null})
    for(let i = 2004; i <= anoAux; i++){
      this.ano.push({label:i.toString(),value:i.toString()});
    }
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

  //PRIVATE METHODS
  private findByParamsFilter(): void {
    if(this.mesSelected == this.anoSelected){
      this.mesAno = '';
    }
    else{
      this.mesAno = this.mesSelected+'/'+this.anoSelected;
    }
    this.indiceIGPDIService.findByParamsFilter(this.page,this.count,this.id,this.mesAno,this.indiceMes,this.multiplicadorIgpdi,this.coeficienteAcumulado)
    .subscribe(
      responseApi => {
        this.tratarResponseApi(responseApi);
      }, err => {
        this.tratarErro(err);
      }
    );
  }

}
