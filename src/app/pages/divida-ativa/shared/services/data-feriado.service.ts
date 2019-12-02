import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { DataFeriado } from '../models/data-feriado.model';
import { DIVIDAATIVA_API_DATA_FERIADO } from '../dividaativa.api';

@Injectable({
  providedIn: 'root'
})
export class DataFeriadoService extends BaseResourceService<DataFeriado>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_DATA_FERIADO, injector, DataFeriado.fromJson);
  }
}
