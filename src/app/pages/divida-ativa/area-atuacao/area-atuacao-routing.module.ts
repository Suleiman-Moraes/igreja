import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaAtuacaoListComponent } from './area-atuacao-list/area-atuacao-list.component';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';
import { AreaAtuacaoFormComponent } from './area-atuacao-form/area-atuacao-form.component';

const routes: Routes = [
  { path: '', component: AreaAtuacaoListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/edit', component: AreaAtuacaoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'new', component: AreaAtuacaoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaAtuacaoRoutingModule { }
