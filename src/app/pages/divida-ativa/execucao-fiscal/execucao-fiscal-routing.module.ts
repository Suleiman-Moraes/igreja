import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExecucaoFiscalListComponent } from './execucao-fiscal-list/execucao-fiscal-list.component';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';
import { ExecucaoFiscalFormComponent } from './execucao-fiscal-form/execucao-fiscal-form.component';

const routes: Routes = [
  { path: '', component: ExecucaoFiscalListComponent, canActivate: [AuthGuard], data: {roles: [Role.execucaoFISCAL]}},
  { path: ':id/edit', component: ExecucaoFiscalFormComponent, canActivate: [AuthGuard], data: {roles: [Role.execucaoFISCAL]}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecucaoFiscalRoutingModule { }
