import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { CodigoReceita } from '../../shared/models/codigo-receita.model';
import { CodigoReceitaService } from '../../shared/services/codigo-receita.service';
import { Validators } from '@angular/forms';
import { SituacaoEnum } from '../../shared/enums/situacao.enum';
import { Usuario } from '../../shared/models/usuario.model';
import { AreaAtuacao } from '../../shared/models/area-atuacao.model';
import { TipoDebito } from '../../shared/models/tipo-debito.model';
import { AreaAtuacaoService } from '../../shared/services/area-atuacao.service';
import { TipoDebitoService } from '../../shared/services/tipo-debito.service';
import { ResponseApi } from 'src/app/shared/models/response-api.model';

@Component({
  selector: 'app-codigo-receita-form',
  templateUrl: './codigo-receita-form.component.html',
  styleUrls: ['./codigo-receita-form.component.css']
})
export class CodigoReceitaFormComponent  extends BaseResourceFormComponent <CodigoReceita>  {

  areasAtuacao:AreaAtuacao[];
  tiposDebito:TipoDebito[];

  constructor(
    protected injector: Injector,
    protected codigoReceitaService: CodigoReceitaService,
    protected areaAtuacaoService: AreaAtuacaoService,
    protected tipoDebitoService: TipoDebitoService,
  ) {
    super(injector, codigoReceitaService, CodigoReceita.fromJson);
  }

  protected posNgOnInit(): void {
    this.findAreasAtuacao()
    .then(()=>{
      this.findTiposDebito()
      .then(()=>{
        if(this.resourceForm.value.id != null){
          this.areasAtuacao.forEach(area=>{
            if(area.id == this.resourceForm.value.areaAtuacao.id){
              this.resourceForm.get('areaAtuacao').setValue(area);
            }
          });
          this.tiposDebito.forEach(debito=>{
            if(debito.id == this.resourceForm.value.tipoDebito.id){
              this.resourceForm.get('tipoDebito').setValue(debito);
            }
          })
        }
      }).catch(()=>{this.erroServidor();});
    }).catch(()=>{this.erroServidor();});
  }

  findAreasAtuacao():Promise<null>{
    return new Promise((resolve,reject)=>{
      this.areaAtuacaoService.findBySituacao().subscribe(responseApi=>{
        if(responseApi.data){
          this.areasAtuacao = responseApi.data;
          resolve();
        }
        else{
          this.erroServidor();
          reject();
        }
      });
    });
  }

  findTiposDebito():Promise<null>{
    return new Promise((resolve,reject)=>{
      this.tipoDebitoService.findBySituacao().subscribe(responseApi=>{
        if(responseApi.data){
          this.tiposDebito = responseApi.data;
          resolve();
        }
        else{
          this.erroServidor();
          reject();
        }
      });
    });
  }

  protected buildResourceForm(): void {
    this.urlList = '/dividaativa/codigoreceita';

    this.resourceForm = this.formBuilder.group({
      id: [null],
      codigoReceita:[null, [Validators.required, Validators.maxLength(255)]],
      subCodigoReceita:[null, [Validators.required, Validators.maxLength(255)]],
      tipoDebito:[null, [Validators.required]],
      areaAtuacao:[null, [Validators.required]],
    });
  }
  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Código Receita criado com sucesso!');
    }
    else {
      this.toast.success('Código Receita atualizado com sucesso!');
    }
    this.router.navigate([this.urlList]);
  }
}