import { NgModule } from '@angular/core';

import { ItemChecklistRoutingModule } from './item-checklist-routing.module';
import { ItemChecklistFormComponent } from './item-checklist-form/item-checklist-form.component';
import { ItemChecklistListComponent } from './item-checklist-list/item-checklist-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ItemChecklistFormComponent, 
    ItemChecklistListComponent
  ],
  imports: [
    SharedModule,
    ItemChecklistRoutingModule
  ]
})
export class ItemChecklistModule { }
