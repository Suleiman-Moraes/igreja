import { NgModule } from '@angular/core';

import { DividaAtivaRoutingModule } from './divida-ativa-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService, ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    DividaAtivaRoutingModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class DividaAtivaModule { }
