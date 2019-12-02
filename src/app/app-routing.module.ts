import { NotfoundComponent } from './pages/paginaprincipal/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: 'dividaativa', loadChildren: './pages/divida-ativa/divida-ativa.module#DividaAtivaModule' },
  { path: 'login', loadChildren: './pages/security/security.module#SecurityModule' },
  { path: '404', component: NotfoundComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
