import { DIVIDAATIVA_API_REGISTROEXTERNO } from './../dividaativa.api';
import { RegistroExterno } from './../models/registro-externo.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroExternoService extends BaseResourceService<RegistroExterno>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_REGISTROEXTERNO, injector, RegistroExterno.fromJson);
  }
}
