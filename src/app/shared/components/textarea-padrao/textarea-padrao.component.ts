import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea-padrao',
  templateUrl: './textarea-padrao.component.html',
  styleUrls: ['./textarea-padrao.component.css']
})
export class TextareaPadraoComponent implements OnInit {

  @Input('for-name') forName: string;
  @Input('nome') nome: string;
  @Input('resource-form') resourceForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
