import { CADU_CADASTROUNICO, TRANSPORTE_NAO_REGULAR_HOST, FISCALIZACAO_LOGIN } from './../../divida-ativa/shared/dividaativa.api';
import { AuthenticationService } from './../../security/shared/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { UserLogado } from '../../security/shared/user-logado.model';
import * as $ from 'jquery';
import { UserAuthenticationCadu } from '../../security/shared/user-authentication-cadu.model';
import { Router } from '@angular/router';
import { Usuario } from '../../divida-ativa/shared/models/usuario.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MessageService]
})
export class MenuComponent implements OnInit {

  cadastroUnico: string = CADU_CADASTROUNICO;
  usuarioRouter: string = CADU_CADASTROUNICO + "/usuario";
  

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

  determinaUrlFiscalizacao(pagina: string) {
    if (this.currentUser.user.usuarioInterno && (this.currentUser.user.matricula == null || this.currentUser.user.matricula == '')
      && this.currentUser.user.login != 'root') {
      this.showError("Usuário não possui matrícula.")
      return;
    }
    window.location.href = `${FISCALIZACAO_LOGIN}/${this.currentUser.token}/logar/${pagina}`, '_blank';
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

  determinaURL(pagina, modulo) {
    if(modulo == 'FRETAMENTO'){
      this.deslogar();
      let urlTransporte = TRANSPORTE_NAO_REGULAR_HOST + "ModuloTransporte/autenticar/Autenticar.xhtml?pagina="+pagina;
      $('#autenticarFretamento').attr('action', urlTransporte);
      document.getElementById('postFretamento').click();
    }
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