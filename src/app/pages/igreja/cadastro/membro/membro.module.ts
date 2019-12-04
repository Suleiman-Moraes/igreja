import { NgModule } from '@angular/core';

import { MembroRoutingModule } from './membro-routing.module';
import { MembroFormComponent } from './membro-form/membro-form.component';
import { MembroListComponent } from './membro-list/membro-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MembroFormComponent, MembroListComponent],
  imports: [
    SharedModule,
    MembroRoutingModule
  ]
})
export class MembroModule { }
