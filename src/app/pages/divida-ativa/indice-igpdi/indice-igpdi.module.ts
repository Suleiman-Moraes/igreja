import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndiceIgpdiRoutingModule } from './indice-igpdi-routing.module';
import { IndiceIgpdiListComponent } from './indice-igpdi-list/indice-igpdi-list.component';
import { IndiceIgpdiFormComponent } from './indice-igpdi-form/indice-igpdi-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [IndiceIgpdiListComponent, IndiceIgpdiFormComponent],
  imports: [
    SharedModule,
    IndiceIgpdiRoutingModule
  ]
})
export class IndiceIgpdiModule { }
