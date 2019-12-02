import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../security/auth.guard';
import { CodigoReceitaListComponent } from './codigo-receita-list/codigo-receita-list.component';
import { CodigoReceitaFormComponent } from './codigo-receita-form/codigo-receita-form.component';
import { Role } from '../../security/shared/role.enum';

const routes: Routes = [
  { path: '', component: CodigoReceitaListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/edit', component: CodigoReceitaFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'new', component: CodigoReceitaFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodigoReceitaRoutingModule { }
