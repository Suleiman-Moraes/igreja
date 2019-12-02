import { DIVIDAATIVA_API_REGISTRO } from './../dividaativa.api';
import { Registro } from './../models/registro.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService extends BaseResourceService<Registro>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_REGISTRO, injector, Registro.fromJson);
  }
}
