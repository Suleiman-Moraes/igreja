import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';
import { NegociacaoListComponent } from './negociacao-list/negociacao-list.component';
import { NegociacaoFormComponent } from './negociacao-form/negociacao-form.component';
import { NegociacaoListPagamentoIntegralComponent } from './negociacao-list-pagamento-integral/negociacao-list-pagamento-integral.component';

const routes: Routes = [
  { path: '', component: NegociacaoListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'pilist', component: NegociacaoListPagamentoIntegralComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'form', component: NegociacaoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/edit', component: NegociacaoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NegociacaoRoutingModule { }
