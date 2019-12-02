import { Component, Injector } from '@angular/core';
import { Parametro } from '../../shared/models/parametro.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ParametroService } from '../../shared/services/parametro.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-parametro-form',
  templateUrl: './parametro-form.component.html',
  styleUrls: ['./parametro-form.component.css']
})
export class ParametroFormComponent extends BaseResourceFormComponent<Parametro>{

  constructor(
    protected injector: Injector,
    protected parametroService: ParametroService
  ) {
    super(injector, parametroService, Parametro.fromJson);
  }

  //METHODS PRIVATE
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      tipoParametro: [null, [Validators.required, Validators.maxLength(255)]],
      valor: [null, [Validators.required, Validators.maxLength(255)]]
    });
  }

  protected posSubmitFormSucesso(): void {
    if (this.currentAction == 'new') {
      this.toast.success('Parâmetro criado com sucesso!');
    }
    else {
      this.toast.success('Parâmetro atualizado com sucesso!');
    }

    this.router.navigate([this.urlList]);
  }

  protected posNgOnInit(): void {
    this.urlList = '/dividaativa/parametro';
  }

  protected createPageTitle(): string {
    return 'Novo Parâmetro';
  }

  protected editionPageTitle(): string {
    return 'Edição de Parâmetro';
  }
}
