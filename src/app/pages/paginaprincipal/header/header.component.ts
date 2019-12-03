import { UserLogado } from './../../security/shared/user-logado.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../security/shared/authentication-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private currentUserName: string = null;
  private currentUser: UserLogado = null;
  userLogin = '';
  home = '#/pages';

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser) {
      this.userLogin = this.currentUser.user.login;
    }
    if (document.getElementById('menusButton') != null) {
      document.getElementById('menusButton').click();
    }
  }

  deslogar(): void {
    this.authenticationService.logout();
  }

  signOut() { }

  get capturarNomeUsuario(): string {
    return this.currentUser.user.nome;
  }

  get captruarData(): Date {
    return this.currentUser.user.dataInclusao;
  }

  // PRIVATE METHODS
}