import { CADU_CADASTROUNICO } from './../../../pages/divida-ativa/shared/dividaativa.api';
import { Component, OnInit, Input } from '@angular/core';

interface BreadCrumbItem{
  text: string;
  link?: string;
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  @Input() itens: Array<BreadCrumbItem> = [];

  cadastroUnico = CADU_CADASTROUNICO;

  constructor() { }

  ngOnInit() {
  }

  isTheLastItem(item: BreadCrumbItem): boolean{
    const index = this.itens.indexOf(item);
    return index + 1 == this.itens.length;
  }

  getUrlLink(teste:string){
    return this.cadastroUnico.valueOf() + teste;
  }
}
