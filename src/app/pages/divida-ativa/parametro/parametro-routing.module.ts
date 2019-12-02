import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';
import { ParametroListComponent } from './parametro-list/parametro-list.component';
import { ParametroFormComponent } from './parametro-form/parametro-form.component';

const routes: Routes = [
  { path: '', component: ParametroListComponent, canActivate: [AuthGuard], data: {roles: [Role.manterPARAMETROS]}},
  { path: ':id/edit', component: ParametroFormComponent, canActivate: [AuthGuard], data: {roles: [Role.manterPARAMETROS]}},
  { path: 'new', component: ParametroFormComponent, canActivate: [AuthGuard], data: {roles: [Role.manterPARAMETROS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametroRoutingModule { }
