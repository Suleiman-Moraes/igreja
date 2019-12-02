import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoDebitoListComponent } from './tipo-debito-list/tipo-debito-list.component';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';
import { TipoDebitoFormComponent } from './tipo-debito-form/tipo-debito-form.component';

const routes: Routes = [
  { path: '', component: TipoDebitoListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/edit', component: TipoDebitoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'new', component: TipoDebitoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoDebitoRoutingModule { }
