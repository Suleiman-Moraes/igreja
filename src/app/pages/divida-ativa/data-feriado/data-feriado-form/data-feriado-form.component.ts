import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { DataFeriado } from '../../shared/models/data-feriado.model';
import { DataFeriadoService } from '../../shared/services/data-feriado.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-data-feriado-form',
  templateUrl: './data-feriado-form.component.html',
  styleUrls: ['./data-feriado-form.component.css']
})
export class DataFeriadoFormComponent extends BaseResourceFormComponent <DataFeriado>  {
  fixoOrNot:boolean = null;
  yearMap = new Map();

  /* Estancia o mês com a quantidade de dias */

  constructor(
    protected injector: Injector,
    protected dataFeriadoService: DataFeriadoService
  ) {
    super(injector, dataFeriadoService, DataFeriado.fromJson);
  }

  protected buildResourceForm(): void {
    this.urlList = '/dividaativa/dataferiado';

    this.resourceForm = this.formBuilder.group({
      id: [null],
      dataFeriadoFixo: [null],
      dataFeriadoVariavel: [null],
      descricao: [null, [Validators.required, Validators.maxLength(255)]],
    });
  }

  posNgOnInit(){
    this.yearMap.set(1,31);/*Janeiro*/
    this.yearMap.set(2,29);/*Fevereiro*/
    this.yearMap.set(3,31);/*Março*/
    this.yearMap.set(4,30);/*Abril*/
    this.yearMap.set(5,31);/*Maio*/
    this.yearMap.set(6,30);/*Junho*/
    this.yearMap.set(7,31);/*Julho*/
    this.yearMap.set(8,31);/*Agosto*/
    this.yearMap.set(9,30);/*Setembro*/
    this.yearMap.set(10,31);/*Outubro*/
    this.yearMap.set(11,30);/*Novembro*/
    this.yearMap.set(12,31);/*Dezembro*/
  }

  protected posLoadResource(): void {
    this.fixoOrNot = this.resourceForm.get('dataFeriadoFixo').value != null;
    if(!this.fixoOrNot){
      this.resourceForm.get('dataFeriadoVariavel').setValue(new Date(this.resource.dataFeriadoVariavel));
    }
  }

  verificaData(event:KeyboardEvent){
    if(event.code == 'Backspace'){
      return;
    }
    let diaEMes:string[] = new String(this.resourceForm.value.dataFeriadoFixo).split('/');
    let dia:number = new Number(diaEMes[0]).valueOf();
    let mes:number = new Number(diaEMes[1]).valueOf();
    if(mes > 12 ){
      mes = 12;
    }
    if(dia > this.yearMap.get(mes)){
      dia = this.yearMap.get(mes);
    }
    this.resourceForm.get('dataFeriadoFixo').setValue(dia.toString() + '/' + mes.toString())
  }

  changeTipoData(valor:boolean){
    this.fixoOrNot = valor;
    this.resourceForm.get('dataFeriadoFixo').setValue(null);
    this.resourceForm.get('dataFeriadoVariavel').setValue(null);
  }


  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Feriado criado com sucesso!');
    }
    else {
      this.toast.success('Feriado atualizado com sucesso!');
    }
    this.router.navigate([this.urlList]);
  }
}
