import { DIVIDAATIVA_API_LICENCA } from './../dividaativa.api';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseResourceService<Usuario>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_LICENCA, injector, Usuario.fromJson);
  }
}
