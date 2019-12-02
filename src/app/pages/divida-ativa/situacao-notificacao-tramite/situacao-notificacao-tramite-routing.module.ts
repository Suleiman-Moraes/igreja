import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SituacaoNotificacaoTramiteListComponent } from './situacao-notificacao-tramite-list/situacao-notificacao-tramite-list.component';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';
import { SituacaoNotificacaoTramiteFormComponent } from './situacao-notificacao-tramite-form/situacao-notificacao-tramite-form.component';

const routes: Routes = [
  { path: '', component: SituacaoNotificacaoTramiteListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/edit', component: SituacaoNotificacaoTramiteFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'new', component: SituacaoNotificacaoTramiteFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SituacaoNotificacaoTramiteRoutingModule { }
