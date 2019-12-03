import { AuthenticationService } from './../../security/shared/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { UserLogado } from '../../security/shared/user-logado.model';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MessageService]
})
export class MenuComponent implements OnInit {

  home = '#/pages';


  // tslint:disable-next-line: new-parens
  currentUser: UserLogado = new UserLogado;

  usuarioInterno = false;
  verificarPermissaoModuloRegular: boolean = null;
  cont = 0;

  // Permissões
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
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  protected showError(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail });
  }

  temPermissao(per: string): boolean {
    if (this[per] == null) {
      this[per] = this.verificarPermissao(per);
    }
    return this[per];
  }

  pesquisarMenu(): void {
    const term = $('#search-input').val().trim();
    if (term.length === 0) {
      $('.sidebar-menu li').each(function() {
        $(this).show(0);
        $(this).removeClass('active');
        if ($(this).data('lte.pushmenu.active')) {
          $(this).addClass('active');
        }
      });
      return;
    }

    $('.sidebar-menu li').each(function() {
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

        const parent = $(this).parents('li').first();
        if (parent.is('.treeview')) {
          parent.show(0);
        }
      }

      if ($(this).is('.header')) {
        $(this).show();
      }
    });

    $('.sidebar-menu li.pushmenu-search-found.treeview').each(function() {
      $(this).find('.pushmenu-search-found').show(0);
    });
  }

  redirect(module: string) {
    this.deslogar();
    window.location.href = this.home + module;
  }

  getUrlLink(teste: string) {
    return this.home.valueOf() + teste;
  }

  deslogar(): void {
    this.authenticationService.logout();
  }

  private verificarPermissao(pers: string): boolean {
    if (pers == null || pers.length <= 0) {
      return true;
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.currentUser.roles.length; i++) {
      // tslint:disable-next-line: triple-equals
      if (pers.toLowerCase() == this.currentUser.roles[i].toLowerCase()) {
        return true;
      }
    }
    return false;
  }
}
