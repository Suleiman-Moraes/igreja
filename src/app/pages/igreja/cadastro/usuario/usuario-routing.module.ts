import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/pages/security/auth.guard';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';

const routes: Routes = [
  { path: 'perfil', component: PerfilFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
