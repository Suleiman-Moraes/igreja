import { Role } from './../../security/shared/role.enum';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PercentualReducaoListComponent } from './percentual-reducao-list/percentual-reducao-list.component';
import { PercentualReducaoFormComponent } from './percentual-reducao-form/percentual-reducao-form.component';
import { AuthGuard } from '../../security/auth.guard';

const routes: Routes = [
  { path: '', component: PercentualReducaoListComponent, canActivate: [AuthGuard], data: {roles: [Role.manterPARAMETROS]}},
  { path: ':id/edit', component: PercentualReducaoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.manterPARAMETROS]}},
  { path: 'new', component: PercentualReducaoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.manterPARAMETROS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PercentualReducaoRoutingModule { }
