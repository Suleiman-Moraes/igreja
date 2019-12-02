import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-debito-detalhe-aux',
  templateUrl: './debito-detalhe-aux.component.html',
  styleUrls: ['./debito-detalhe-aux.component.css']
})
export class DebitoDetalheAuxComponent implements OnInit {

  @Input('objeto') objeto: any = '';

  constructor() { }

  ngOnInit() {
  }

}
