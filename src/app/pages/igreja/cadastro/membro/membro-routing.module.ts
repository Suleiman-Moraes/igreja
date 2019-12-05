import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembroListComponent } from './membro-list/membro-list.component';
import { MembroFormComponent } from './membro-form/membro-form.component';
import { AuthGuard } from 'src/app/pages/security/auth.guard';
import { Role } from 'src/app/pages/security/shared/role.enum';

const routes: Routes = [
  { path: '', component: MembroListComponent, canActivate: [AuthGuard], data: {roles: [Role.pastor]}},
  { path: ':id/edit', component: MembroFormComponent, canActivate: [AuthGuard], data: {roles: [Role.pastor]}},
  { path: 'new', component: MembroFormComponent, canActivate: [AuthGuard], data: {roles: [Role.pastor]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembroRoutingModule { }
