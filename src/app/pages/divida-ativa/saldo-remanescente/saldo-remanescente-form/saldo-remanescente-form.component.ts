import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { SaldoRemanescente } from '../../shared/models/saldo-remanescente.model';
import { SaldoRemanescenteService } from '../../shared/services/saldo-remanescente.service';
import { Validators } from '@angular/forms';
import { Devedor } from '../../shared/models/devedor.model';
import { DevedorService } from '../../shared/services/devedor.service';
import { ResponseApi } from 'src/app/shared/models/response-api.model';

@Component({
  selector: 'app-saldo-remanescente-form',
  templateUrl: './saldo-remanescente-form.component.html',
  styleUrls: ['./saldo-remanescente-form.component.css']
})
export class SaldoRemanescenteFormComponent extends BaseResourceFormComponent<SaldoRemanescente>{

  devedor:Devedor;

  observacaoAntes:string;

  constructor(
    protected injector: Injector,
    protected saldoRemanescenteService: SaldoRemanescenteService,
    protected devedorService: DevedorService
  ) {
    super(injector, saldoRemanescenteService, SaldoRemanescente.fromJson);
  }

  protected posNgOnInit(): void {
    this.urlList = '/dividaativa/saldoremanescente';
  }

  posLoadResource(){
    this.devedorService.getById(this.resource.devedorId).subscribe(responseApi=>{
      if(responseApi.data != null){
        this.devedor = responseApi.data;
      } else {
        this.erroServidor();
      }
    });
    this.observacaoAntes = this.resource.observacao;
  }

  protected posSubmitFormSucesso(): void {
    this.toast.success('Saldo atualizado com sucesso!');

    this.router.navigate([this.urlList]);
  }

  protected editionPageTitle(): string {
    return 'Zerando Saldo Remanescente';
  }


  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      saldo: [null, [Validators.required]],
      devedorId: [0,[Validators.required]],
      observacao: [null, [Validators.required]],
    });
  }

  beforeSubmitForm(){
    if(this.resourceForm.valid){
      this.resourceForm.get('saldo').setValue(0);
    }
  }

  getPodeZerar(){
    return this.observacaoAntes == (this.resourceForm.value.observacao);
  }
}
