import { DIVIDAATIVA_API_PARAMETRO } from './../dividaativa.api';
import { Injectable, Injector } from '@angular/core';
import { Parametro } from '../models/parametro.model';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class ParametroService extends BaseResourceService<Parametro>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_PARAMETRO, injector, Parametro.fromJson);
  }
}
