import { Usuario } from './../../../shared/models/usuario.model';
import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { Validators } from '@angular/forms';
import { UserLogado } from 'src/app/pages/security/shared/user-logado.model';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent extends BaseResourceFormComponent<Usuario>{

  constructor(
    protected injector: Injector,
    protected usuarioService: UsuarioService
  ) {
    super(injector, usuarioService, Usuario.fromJson);
  }

  //METHODS PRIVATE
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      login: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      senha: [null, [Validators.required]],
      ativo: [true, [Validators.required]],
      dataInclusao: [null],
      membro: [null],
      permissoes: [null]
    });
  }

  // protected beforeSubmitForm(): void {
  //   this.resourceForm.get('dataNascimento').setValue(new Date((this.resourceForm.value.dataNascimento + '').toString()));
  // }

  protected posSubmitFormSucesso(): void {
    this.toast.success('Perfil atualizado com sucesso!');
  }

  protected posNgOnInit(): void {
    this.urlList = '/pages/cadastro/membro';
    this.currentAction = 'edit';
  }

  protected createPageTitle(): string {
    return 'Meu Perfil';
  }

  protected editionPageTitle(): string {
    return 'Meu Perfil';
  }

  protected loadResource(): void {
    this.authenticationService.refresh().subscribe(
      (user: UserLogado) => {
        if (user != null) {
          this.resource = user.user;
          if (this.resource.id == null) {
            this.showError('Nenhum Registro encontrado.');
          }
          this.resourceForm.patchValue(this.resource);
          this.posLoadResource();
        }
      }, err => {
        this.tratarErro(err);
      }
    );
  }
}
