import { NgModule } from '@angular/core';

import { ExecucaoFiscalRoutingModule } from './execucao-fiscal-routing.module';
import { ExecucaoFiscalListComponent } from './execucao-fiscal-list/execucao-fiscal-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExecucaoFiscalFormComponent } from './execucao-fiscal-form/execucao-fiscal-form.component';

@NgModule({
  declarations: [ExecucaoFiscalListComponent, ExecucaoFiscalFormComponent],
  imports: [
    SharedModule,
    ExecucaoFiscalRoutingModule
  ]
})
export class ExecucaoFiscalModule { }
