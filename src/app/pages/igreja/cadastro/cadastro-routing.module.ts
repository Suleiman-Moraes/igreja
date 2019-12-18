import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'membro', loadChildren: './membro/membro.module#MembroModule' },
  { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
