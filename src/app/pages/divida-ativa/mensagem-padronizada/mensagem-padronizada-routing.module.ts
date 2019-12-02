import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MensagemPadronizadaListComponent } from './mensagem-padronizada-list/mensagem-padronizada-list.component';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';
import { MensagemPadronizadaFormComponent } from './mensagem-padronizada-form/mensagem-padronizada-form.component';

const routes: Routes = [
  { path: '', component: MensagemPadronizadaListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/edit', component: MensagemPadronizadaFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'new', component: MensagemPadronizadaFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensagemPadronizadaRoutingModule { }
