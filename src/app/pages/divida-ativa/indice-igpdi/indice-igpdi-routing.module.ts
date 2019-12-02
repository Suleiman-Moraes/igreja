import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndiceIgpdiListComponent } from './indice-igpdi-list/indice-igpdi-list.component';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';
import { IndiceIgpdiFormComponent } from './indice-igpdi-form/indice-igpdi-form.component';

const routes: Routes = [
  { path: '', component: IndiceIgpdiListComponent, canActivate: [AuthGuard], data: {roles: [Role.cadastrarIGPDI]}},
  { path: ':id/edit', component: IndiceIgpdiFormComponent, canActivate: [AuthGuard], data: {roles: [Role.cadastrarIGPDI]}},
  { path: 'new', component: IndiceIgpdiFormComponent, canActivate: [AuthGuard], data: {roles: [Role.cadastrarIGPDI]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndiceIgpdiRoutingModule { }
