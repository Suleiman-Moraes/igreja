import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataFeriadoListComponent } from './data-feriado-list/data-feriado-list.component';
import { DataFeriadoFormComponent } from './data-feriado-form/data-feriado-form.component';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';

const routes: Routes = [
  { path: '', component: DataFeriadoListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/edit', component: DataFeriadoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'new', component: DataFeriadoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataFeriadoRoutingModule { }
