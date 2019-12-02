import { DIVIDAATIVA_API_TRAMITE_DEBITOTRAMITEDTO, DTO } from './../dividaativa.api';
import { map, catchError } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { Tramite } from '../models/tramite.model';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { DIVIDAATIVA_API_TRAMITE } from '../dividaativa.api';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TramiteService extends BaseResourceService<Tramite>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_TRAMITE, injector, Tramite.fromJson);
  }

  findDebitoTramiteDtoByDebitoId(id): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_TRAMITE_DEBITOTRAMITEDTO}/${id}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  

  createDTOManul(resource, userUnidadeId): Observable<ResponseApi> {
    return this.http.post(`${this.apiPath + DTO}?unidadeid=${userUnidadeId}`, resource).pipe(
        map(this.fromJsonResponseApi.bind(this)),
        catchError(this.handleError)
    )
  }
}
