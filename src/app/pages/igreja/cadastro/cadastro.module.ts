import { NgModule } from '@angular/core';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService, ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [

  ],
  imports: [
    SharedModule,
    CadastroRoutingModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class CadastroModule { }
