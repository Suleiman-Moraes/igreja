import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembroListComponent } from './membro-list/membro-list.component';
import { MembroFormComponent } from './membro-form/membro-form.component';
import { AuthGuard } from 'src/app/pages/security/auth.guard';

const routes: Routes = [
  { path: '', component: MembroListComponent, canActivate: [AuthGuard]},
  { path: ':id/edit', component: MembroFormComponent, canActivate: [AuthGuard]},
  { path: 'new', component: MembroFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembroRoutingModule { }
