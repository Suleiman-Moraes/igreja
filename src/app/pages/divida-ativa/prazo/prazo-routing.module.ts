import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrazoListComponent } from './prazo-list/prazo-list.component';
import { PrazoFormComponent } from './prazo-form/prazo-form.component';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';

const routes: Routes = [
  { path: '', component: PrazoListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/edit', component: PrazoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'new', component: PrazoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrazoRoutingModule { }
