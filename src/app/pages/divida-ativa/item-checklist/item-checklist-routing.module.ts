import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemChecklistListComponent } from './item-checklist-list/item-checklist-list.component';
import { ItemChecklistFormComponent } from './item-checklist-form/item-checklist-form.component';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';

const routes: Routes = [
  { path: '', component: ItemChecklistListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/edit', component: ItemChecklistFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'new', component: ItemChecklistFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemChecklistRoutingModule { }
