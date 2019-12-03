import { AuthenticationService } from './shared/authentication-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLogado } from './shared/user-logado.model';
import { UrlPermissaoEnum } from './shared/url-permissao.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser: UserLogado = this.authenticationService.currentUserValue;
        if (currentUser) {
            if (route.data.roles) {
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < currentUser.roles.length; i++) {
                    if (route.data.roles.indexOf(currentUser.roles[i] + '') >= 0) {
                        return true;
                    }
                }
                // role not authorised so redirect to home page
                this.router.navigate([UrlPermissaoEnum.notFound]);
                return false;
            }
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}