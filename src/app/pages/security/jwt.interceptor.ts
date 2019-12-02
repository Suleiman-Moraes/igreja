import { AuthenticationService } from './shared/authentication-service.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DebitoListComponent } from '../divida-ativa/debito/debito-list/debito-list.component';
import { ExecucaoFiscalListComponent } from '../divida-ativa/execucao-fiscal/execucao-fiscal-list/execucao-fiscal-list.component';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(
        private authenticationService: AuthenticationService
    ){}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': currentUser.token
                }
            });
        }
        clearTimeout(DebitoListComponent.time);
        clearTimeout(ExecucaoFiscalListComponent.time);
        return next.handle(request);
    }
}