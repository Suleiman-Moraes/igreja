import { NgModule } from '@angular/core';
import { CodigoReceitaRoutingModule } from './codigo-receita-routing.module';
import { CodigoReceitaListComponent } from './codigo-receita-list/codigo-receita-list.component';
import { CodigoReceitaFormComponent } from './codigo-receita-form/codigo-receita-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CodigoReceitaListComponent, CodigoReceitaFormComponent],
  imports: [
    SharedModule,
    CodigoReceitaRoutingModule
  ]
})
export class CodigoReceitaModule { }
