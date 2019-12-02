import { MenuComponent } from './pages/paginaprincipal/menu/menu.component';
import { SettingsComponent } from './pages/paginaprincipal/settings/settings.component';
import { FooterComponent } from './pages/paginaprincipal/footer/footer.component';
import { HeaderComponent } from './pages/paginaprincipal/header/header.component';
import { PaginaprincipalComponent } from './pages/paginaprincipal/paginaprincipal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { JwtInterceptor } from './pages/security/jwt.interceptor';
import { AuthGuard } from './pages/security/auth.guard';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NotfoundComponent } from './pages/paginaprincipal/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaprincipalComponent, 
    HeaderComponent, 
    FooterComponent, 
    SettingsComponent, 
    MenuComponent, 
    NotfoundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { 
      provide: LocationStrategy, 
      useClass: HashLocationStrategy 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
