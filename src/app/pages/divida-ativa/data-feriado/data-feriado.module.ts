import { NgModule } from '@angular/core';
import { DataFeriadoRoutingModule } from './data-feriado-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataFeriadoListComponent } from './data-feriado-list/data-feriado-list.component';
import { DataFeriadoFormComponent } from './data-feriado-form/data-feriado-form.component';

@NgModule({
  declarations: [DataFeriadoListComponent, DataFeriadoFormComponent],
  imports: [
    SharedModule,
    DataFeriadoRoutingModule
  ]
})
export class DataFeriadoModule { }
