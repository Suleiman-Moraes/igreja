import { EdicaoRefis } from './../../shared/models/edicao-refis.model';
import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { EdicaoRefisService } from '../../shared/services/edicao-refis.service';
import { Validators, FormArray } from '@angular/forms';
import { ParametroService } from '../../shared/services/parametro.service';

@Component({
  selector: 'app-percentual-reducao-form',
  templateUrl: './percentual-reducao-form.component.html',
  styleUrls: ['./percentual-reducao-form.component.css']
})
export class PercentualReducaoFormComponent extends BaseResourceFormComponent<EdicaoRefis>{

  private x:number = 0;
  private basePot:number;
  private valorFimAux;

  constructor(
    protected injector: Injector,
    protected edicaoRefisService: EdicaoRefisService,
    protected parametroService: ParametroService
  ) {
    super(injector, edicaoRefisService, EdicaoRefis.fromJson);
  }

  get percentualReducaos(): FormArray{
    return this.resourceForm.get('percentualReducaos') as FormArray;
  }

  alterarValorDeParcelas(): void{
    if(this.resourceForm.value.numeroParcela > 1){
      if(this.percentualReducaos.length >= this.resourceForm.value.numeroParcela){
        const novo: number = this.percentualReducaos.length - this.resourceForm.value.numeroParcela + 1;
        for(var i = 0; i < novo; i++){
          this.percentualReducaos.removeAt(this.percentualReducaos.length - 1);
        }
      }
      else if(this.percentualReducaos.length < this.resourceForm.value.numeroParcela){
        for(var i = this.percentualReducaos.length; i < this.resourceForm.value.numeroParcela - 1; i++){
          this.addPercentual(i);
        }
      }
    }
    else{
      for(var i = 0; i < this.percentualReducaos.length; i++){
        this.percentualReducaos.removeAt(0);
      }
      this.resourceForm.get('numeroParcela').setValue(0);
    }
  }

  defineValorFim(position:number):Promise<null>{
    return new Promise((resolve,reject)=>{
      let parcelaNum = this.percentualReducaos.controls[position].get('numeroParcela').value;
      let potencia = Math.pow(this.basePot,( -parcelaNum+1 ));
      this.valorFimAux = ((this.x)/(1-potencia)).toFixed(10);
      resolve();
    });
  }

  defineCoeficienteDoCalculo(position:number){
    if(this.percentualReducaos.controls[position].get('percentualReducao').invalid ){
      return;
    }
    this.defineValorFim(position).then(()=>{
      this.percentualReducaos.controls[position].get('coeficienteCalculo').setValue(this.valorFimAux); 
    })
  }

  //METHODS PRIVATE
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      anoEdicao: [null, [Validators.required, Validators.maxLength(45)]],
      numeroParcela: [null, [Validators.required, Validators.maxLength(45)]],
      descricao: [null, [Validators.required]],
      dataCadastro: [null],
      percentualReducaos: this.formBuilder.array(new Array())
    });
  }

  private addPercentual(num: number) {
    this.percentualReducaos.push(this.formBuilder.group({
      numeroParcela: [num + 2, [Validators.required]],
      percentualReducao: [null, [Validators.required, Validators.maxLength(255)]],
      coeficienteCalculo: [null, [Validators.required, Validators.maxLength(255)]],
      edicaoRefisId: [null]
    }));
  }

  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Percentual de Redução criado com sucesso!');
    }
    else {
      this.toast.success('Percentual de Redução atualizado com sucesso!');
    }

    this.router.navigate([this.urlList]);
  }

  defineX():Promise<null>{
    return new Promise((resolve,reject)=>{
      this.parametroService.getById(1).subscribe(responseApi=>{
        if(responseApi.data != null){
          this.x += this.convertToNumber(responseApi.data.valor);
        }
        else{
          this.erroServidor();
          reject();
        }
      });
      this.parametroService.getById(2).subscribe(responseApi=>{
        if(responseApi.data != null){
          this.x += this.convertToNumber(responseApi.data.valor);
          resolve();
        }
        else{
          this.erroServidor();
          reject();
        }
      });
    });
  }

  protected posNgOnInit(): void {
    this.urlList = '/dividaativa/percentualreducao';
    this.defineX().then(()=>{
      this.x = this.x /100;
      this.basePot = this.x + 1;
    }).catch();
  }

  protected createPageTitle(): string {
    return 'Novo Percentual de Redução';
  }

  protected editionPageTitle(): string {
    return 'Edição de Percentual de Redução';
  }

  protected posLoadResource(): void{
    this.resource.percentualReducaos.forEach(p => {
      this.percentualReducaos.push(this.formBuilder.group(p));
    });
  }
}
