import { Component, OnInit, Injector } from '@angular/core';
import { IndiceIGPDI } from '../../shared/models/IndiceIGPDI.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { IndiceIGPDIService } from '../../shared/services/IndiceIGPDI.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-indice-igpdi-form',
  templateUrl: './indice-igpdi-form.component.html',
  styleUrls: ['./indice-igpdi-form.component.css']
})
export class IndiceIgpdiFormComponent extends BaseResourceFormComponent<IndiceIGPDI> {

  meses:string[] = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  private mesAno = (this.meses[(new Date().getMonth())-1])+'/'+(new Date().getFullYear().toString());
  multiMesAnterior:number;
  renderedForm:boolean = true;

  constructor(
    protected injector: Injector,
    protected indiceIGPDIService: IndiceIGPDIService
  ) {
    super(injector, indiceIGPDIService, IndiceIGPDI.fromJson);
  }

  protected posNgOnInit(): void {
    this.urlList = '/dividaativa/indiceigpdi';
    this.indiceIGPDIService.findLastMultiplicador().subscribe(
      responseApi=>{
        if(responseApi.data!= null){
          this.multiMesAnterior = this.convertToNumber(responseApi.data);
        }
      }
    );
    this.indiceIGPDIService.findLastMesAno().subscribe(
      responseApi=>{
        if(responseApi.data!= null){
          this.renderedForm = (responseApi.data != this.mesAno || this.currentAction != 'new');
        }
      }
    );
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      mesAno: [this.mesAno, [Validators.required]],
      indiceMes: [null,[Validators.required]],
      multiplicadorIgpdi: [0,[Validators.required]],
      coeficienteAcumulado: [null, [Validators.required]],
    });
  }
  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Item do Checklist criado com sucesso!');
    }
    else {
      this.toast.success('Item do Checklist atualizado com sucesso!');
    }

    this.router.navigate([this.urlList]);
  }

  passaCem(){
    if(this.resourceForm.get('indiceMes').value > 100){
      this.resourceForm.get('indiceMes').setValue('100');
    }
    else{
      if(this.resourceForm.get('indiceMes').value < -100){
        this.resourceForm.get('indiceMes').setValue('-100');
      }
    }

    let indice:number = this.convertToNumber(this.resourceForm.get('indiceMes').value);
    let multiplicador:number = (1 + (indice/100));
    this.resourceForm.get('multiplicadorIgpdi').setValue(multiplicador.toFixed(4));
    let coeficienteAcumulado = multiplicador * this.multiMesAnterior;
    this.resourceForm.get('coeficienteAcumulado').setValue(coeficienteAcumulado.toFixed(4));
  }
}
