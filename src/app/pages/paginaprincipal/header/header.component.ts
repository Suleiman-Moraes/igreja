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
  userLogin: string = '';
  cadastroUnico: string = 'home';

  constructor(
    private authenticationService: AuthenticationService
  ){}

  ngOnInit(){
    this.currentUser = this.authenticationService.currentUserValue;
    if(this.currentUser){
      this.userLogin = this.currentUser.user.login;
    }
    if(document.getElementById('menusButton') != null ){
      document.getElementById('menusButton').click();
    }
  }

  deslogar(): void{
    this.authenticationService.logout();
  }

  getUrlLink(teste:string){
    return this.cadastroUnico.valueOf() + teste;
  }

  signOut(){
    
  }

  get capturarNomeUsuario(): string{
    if (this.currentUser != null && this.currentUserName == null) {
      if(this.currentUser.user.nome != null && this.currentUser.user.nome != ''){
        this.currentUserName = this.currentUser.user.nome;
      }
      else if(this.currentUser.user.pessoaFisica != null){
        this.currentUserName = this.currentUser.user.pessoaFisica.nome;
      }
      else if(this.currentUser.user.pessoaJuridica != null){
        this.currentUserName = this.currentUser.user.pessoaJuridica.nomeFantasia;
      }
      else{
        this.currentUserName = this.currentUser.user.login;
      }
    }

    return this.currentUserName;
  }

  get captruarData(): Date{
    if(this.currentUser != null){
      if(this.currentUser.user.pessoaFisica != null){
        return this.currentUser.user.pessoaFisica.dataInclusao;
      }
      if(this.currentUser.user.pessoaJuridica != null){
        return this.currentUser.user.pessoaJuridica.dataInclusao;
      }
    }
    return null;
  }

  //PRIVATE METHODS

}
