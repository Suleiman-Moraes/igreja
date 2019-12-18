import { NgModule } from '@angular/core';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PerfilFormComponent
  ],
  imports: [
    SharedModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
