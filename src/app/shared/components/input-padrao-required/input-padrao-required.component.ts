import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-padrao-required',
  templateUrl: './input-padrao-required.component.html',
  styleUrls: ['./input-padrao-required.component.css']
})
export class InputPadraoRequiredComponent implements OnInit {

  @Input('for-name') forName: string;
  @Input('nome') nome: string;
  @Input('resource-form') resourceForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
