import { IGREJA_API_USUARIO } from './../igreja.api';
import { Usuario } from './../models/usuario.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Usuario>{

  constructor(protected injector: Injector) {
    super(IGREJA_API_USUARIO, injector, Usuario.fromJson);
  }
}
