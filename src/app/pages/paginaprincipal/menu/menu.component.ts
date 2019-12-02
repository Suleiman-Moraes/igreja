import { AuthenticationService } from './../../security/shared/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { UserLogado } from '../../security/shared/user-logado.model';
import * as $ from 'jquery';
import { UserAuthenticationCadu } from '../../security/shared/user-authentication-cadu.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Usuario } from '../../igreja/shared/models/usuario.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MessageService]
})
export class MenuComponent implements OnInit {

  cadastroUnico: string = 'home';
  

  currentUser: UserLogado = new UserLogado;

  senhaTemporaria: boolean = true;
  usuarioInterno: boolean = false;
  usuarioPessoaFisicaSemCei: boolean = false;
  verificarPermissaoModuloRegular: boolean = null;
  cont: number = 0;

  //Permissões
  moduloCADU: boolean = null;
  consultarDadosEmpresa: boolean = null;
  moduloFINANCAS: boolean = null;
  moduloTRAMITE: boolean = null;
  manterPARAMETROS: boolean = null;
  moduloREGULARINTERNO: boolean = null;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authenticationService: AuthenticationService
  ){}

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    if(this.currentUser != null){
      if(this.currentUser.user.pessoaFisica != null){
        if(this.currentUser.user.pessoaFisica.cei == null || this.currentUser.user.pessoaFisica.cei.length == 0){
          this.usuarioPessoaFisicaSemCei = true;
        }
      }
      this.senhaTemporaria = this.currentUser != null && this.currentUser.user.senhaTemporaria;
      this.usuarioInterno = this.currentUser.user.usuarioInterno;
      this.getVerificarPermissaoModuloRegular();
    }
  }

  getVerificarPermissaoModuloRegular() {
    let userAux: Usuario = this.currentUser.user;
    let permissao: boolean = false;
    userAux.perfis.forEach(perfil => {

      if (perfil.id != null && (perfil.id == 5 /*Interno Regular*/ || perfil.id == 6 /*Externo Regular*/
        || perfil.id == 3 /*Administrador*/)) {
        permissao = true;
      }
    });
    this.verificarPermissaoModuloRegular = permissao;
  }

  get getPermissaoNaoRegular(): boolean {
    let userAux: Usuario = this.currentUser.user;
    let permissao: boolean = false;
    userAux.perfis.forEach(perfil => {
      if (perfil.id != null && (perfil.id == 1 /*Interno Não Regular*/
        || perfil.id == 2 /*Externo Não Regular*/
        || perfil.id == 3 /*Administrador*/)
      ) {
        permissao = true;
      }
    });
    return permissao;
  }

  get usuarioAutenticacao(): UserAuthenticationCadu{
    return UserAuthenticationCadu.parseUsuario(this.currentUser);
  }

  protected showError(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: detail });
  }

  temPermissao(per: string): boolean{
    if(this[per] == null){
      this[per] = this.verificarPermissao(per);
    }
    return this[per];
  }

  pesquisarMenu(): void{
    var term = $('#search-input').val().trim();
    if (term.length === 0) {
      $('.sidebar-menu li').each(function () {
        $(this).show(0);
        $(this).removeClass('active');
        if ($(this).data('lte.pushmenu.active')) {
          $(this).addClass('active');
        }
      });
      return;
    }

    $('.sidebar-menu li').each(function () {
      if ($(this).text().toLowerCase().indexOf(term.toLowerCase()) === -1) {
        $(this).hide(0);
        $(this).removeClass('pushmenu-search-found', false);

        if ($(this).is('.treeview')) {
          $(this).removeClass('active');
        }
      } else {
        $(this).show(0);
        $(this).addClass('pushmenu-search-found');

        if ($(this).is('.treeview')) {
          $(this).addClass('active');
        }

        var parent = $(this).parents('li').first();
        if (parent.is('.treeview')) {
          parent.show(0);
        }
      }

      if ($(this).is('.header')) {
        $(this).show();
      }
    });

    $('.sidebar-menu li.pushmenu-search-found.treeview').each(function () {
      $(this).find('.pushmenu-search-found').show(0);
    });
  }

  redirect(module:string){
    this.deslogar();
    window.location.href = this.cadastroUnico+module;
  }
  
  getUrlLink(teste:string){
    return this.cadastroUnico.valueOf() + teste;
  }
  
  deslogar(): void{
    this.authenticationService.logout();
  }

  private verificarPermissao(pers: string): boolean{
    if(pers == null || pers.length <= 0){
      return true;
    }
    for (let i = 0; i < this.currentUser.roles.length; i++) {
      if(pers.toLowerCase() == this.currentUser.roles[i].toLowerCase()){
        return true;
      }
    }
    return false;
  }
}