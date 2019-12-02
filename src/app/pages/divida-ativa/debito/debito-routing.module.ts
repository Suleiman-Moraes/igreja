import { DebitoFormComponent } from './debito-form/debito-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebitoListComponent } from './debito-list/debito-list.component';
import { AuthGuard } from '../../security/auth.guard';
import { Role } from '../../security/shared/role.enum';
import { DebitoValidarComponent } from './debito-validar/debito-validar.component';
import { DebitoTramiteComponent } from './debito-tramite/debito-tramite.component';
import { DebitoListExternoComponent } from './debito-list-externo/debito-list-externo.component';
import { DebitoDetalheComponent } from './debito-detalhe/debito-detalhe.component';
import { DebitoTramiteListComponent } from './debito-tramite-list/debito-tramite-list.component';
import { DebitoParaDividaListComponent } from './debito-para-divida-list/debito-para-divida-list.component';

const routes: Routes = [
  { path: '', component: DebitoListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS, Role.moduloTRAMITE]}},
  { path: 'divida', component: DebitoParaDividaListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'tramite', component: DebitoTramiteListComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloTRAMITE]}},
  { path: 'externo', component: DebitoListExternoComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/detalhe', component: DebitoDetalheComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/tramite', component: DebitoTramiteComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS, Role.moduloTRAMITE, Role.execucaoFISCAL]}},
  { path: 'execucaofiscal/:id/tramite', component: DebitoTramiteComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS, Role.moduloTRAMITE, Role.execucaoFISCAL]}},
  { path: ':id/validar', component: DebitoValidarComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: ':id/edit', component: DebitoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}},
  { path: 'new', component: DebitoFormComponent, canActivate: [AuthGuard], data: {roles: [Role.moduloFINANCAS]}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebitoRoutingModule { }
