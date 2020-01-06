import { Usuario } from './../../../shared/models/usuario.model';
import { SituacaoEnum } from 'src/app/pages/igreja/shared/enums/situacao.enum';
import { Membro } from './../../../shared/models/membro.model';
import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { MembroService } from '../../../shared/services/membro.service';
import { Validators, FormGroup } from '@angular/forms';
import { EnderecoService } from '../../../shared/services/endereco.service';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-membro-form',
  templateUrl: './membro-form.component.html',
  styleUrls: ['./membro-form.component.css']
})
export class MembroFormComponent extends BaseResourceFormComponent<Membro>{

  enderecoForm: FormGroup;
  user: Usuario = null;

  constructor(
    protected injector: Injector,
    protected membroService: MembroService,
    private enderecoService: EnderecoService
  ) {
    super(injector, membroService, Membro.fromJson);
  }

  get tipoMembroEnumOptions(): Array<any> {
    return this.getTypes(Membro.tipoMembroEnums);
  }

  buscarEndereco(): void {
    if ((this.enderecoForm.value.cep + '').length == 9) {
      this.enderecoService.obterEnderecoCorreios((this.enderecoForm.value.cep + '').replace('-', '')).subscribe(
        (resource) => {
          if (resource != null) {
            this.enderecoForm.get('rua').setValue(resource.logradouro);
            this.enderecoForm.get('setor').setValue(resource.bairro);
            this.enderecoForm.get('cidade').setValue(resource.localidade);
            this.enderecoForm.get('uf').setValue(resource.uf);
          }
        }
      );
    }
  }

  //METHODS PRIVATE
  protected buildResourceForm(): void {
    this.enderecoForm = this.formBuilder.group({
      id: [null],
      rua: [null],
      quadra: [null],
      lote: [null],
      numero: [null],
      setor: [null],
      cidade: [null],
      uf: [null],
      cep: [null]
    });
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(255)]],
      cpf: [null, [Validators.maxLength(15)]],
      telefone: [null],
      sexo: [true, [Validators.required]],
      situacao: [SituacaoEnum.Ativo, [Validators.required]],
      tipo: [null, [Validators.required]],
      dataNascimento: [null],
      dataInclusao: [null],
      endereco: this.enderecoForm,
      email: [null, [Validators.email, Validators.pattern('[^@]+@.+\..+'), Validators.maxLength(45)]],
      membro: [null, [Validators.required, Validators.maxLength(20)]]
    });
  }

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    }
    else if (this.route.snapshot.url[0].path == "meu") {
      this.currentAction = "meu";
    }
    else {
      this.currentAction = "edit";
    }
  }

  protected beforeSubmitForm(): void {
    this.resourceForm.get('dataNascimento').setValue(new Date((this.resourceForm.value.dataNascimento + '').toString()));
  }

  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Membro criado com sucesso!');
      this.router.navigate([this.urlList]);
    }
    else if (this.currentAction == 'meu') {
      this.toast.success('Cadastro atualizado com sucesso!');
      this.router.navigate(['/pages/cadastro/membro/meu']);
    }
    else {
      this.toast.success('Membro atualizado com sucesso!');
      this.router.navigate([this.urlList]);
    }
  }

  protected posNgOnInit(): void {
    this.urlList = '/pages/cadastro/membro';
    this.user = this.user ? this.user : this.authenticationService.currentUserValue.user;
  }

  protected setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = 'Novo Membro';
    }
    else if (this.currentAction == 'meu') {
      this.pageTitle = 'Meu Cadastro';
    }
    else {
      this.pageTitle = 'Edição de Membro';
    }
  }

  protected loadResource(): void {
    if (this.currentAction != 'new') {
      let id: string = '';
      if (this.currentAction == 'edit') {
        this.route.paramMap.pipe(
          switchMap(params => params.get('id'))
        ).subscribe(
          (param) => {
            id += param;
          }
        );
      }
      else { //meu
        this.user = this.authenticationService.currentUserValue.user;
        id = this.user.membro.id + '';
      }
      this.resourceService.getById(Number(id)).subscribe(
        (responseApi: ResponseApi) => {
          if (responseApi.data == null) {
            responseApi.erros.forEach(x => {
              this.showError(x);
            });
          }
          else {
            this.resource = responseApi.data;
            if (this.resource.id == null) {
              this.showError('Nenhum Registro encontrado.');
            }
            if (this.resource.dataNascimento) {
              this.resource.dataNascimento = new Date(this.resource.dataNascimento.toString());
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
}
