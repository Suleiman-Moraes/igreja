import { DIVIDAATIVA_API_DEVEDOR } from './../dividaativa.api';
import { Injectable, Injector } from '@angular/core';
import { Devedor } from '../models/devedor.model';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class DevedorService extends BaseResourceService<Devedor>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_DEVEDOR, injector, Devedor.fromJson);
  }
}
