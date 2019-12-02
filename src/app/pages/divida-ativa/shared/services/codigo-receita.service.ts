import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { DIVIDAATIVA_API_CODIGO_RECEITA } from '../dividaativa.api';
import { CodigoReceita } from '../models/codigo-receita.model';

@Injectable({
  providedIn: 'root'
})
export class CodigoReceitaService extends BaseResourceService<CodigoReceita>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_CODIGO_RECEITA, injector, CodigoReceita.fromJson);
  }
}
