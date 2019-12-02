import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';
import { SaldoRemanescenteListComponent } from './saldo-remanescente-list/saldo-remanescente-list.component';
import { SaldoRemanescenteFormComponent } from './saldo-remanescente-form/saldo-remanescente-form.component';

const routes: Routes = [
  { path: '', component: SaldoRemanescenteListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/edit', component: SaldoRemanescenteFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'new', component: SaldoRemanescenteFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule]
})
export class SaldoRemanescenteRoutingModule { }
