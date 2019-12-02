import { DIVIDAATIVA_API_PRAZO } from './../dividaativa.api';
import { Prazo } from './../models/prazo.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class PrazoService extends BaseResourceService<Prazo>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_PRAZO, injector, Prazo.fromJson);
  }
}
