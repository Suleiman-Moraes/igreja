import { NgModule } from '@angular/core';
import { SaldoRemanescenteListComponent } from './saldo-remanescente-list/saldo-remanescente-list.component';
import { SaldoRemanescenteFormComponent } from './saldo-remanescente-form/saldo-remanescente-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SaldoRemanescenteRoutingModule } from './saldo-remanescente-routing.module';

@NgModule({
  declarations: [SaldoRemanescenteListComponent, SaldoRemanescenteFormComponent],
  imports: [
    SharedModule,
    SaldoRemanescenteRoutingModule
  ]
})
export class SaldoRemanescenteModule { }
