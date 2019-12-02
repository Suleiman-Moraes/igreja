import { DIVIDAATIVA_API_EDICAOREFIS, DIVIDAATIVA_API_DIVIDA_ATIVA, DIVIDAATIVA_API_DIVIDA_ATIVA_FIND_DEBITO } from '../dividaativa.api';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { DividaAtiva } from '../models/divida-ativa.model';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DividaAtivaService extends BaseResourceService<DividaAtiva>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_DIVIDA_ATIVA, injector, DividaAtiva.fromJson);
  }

  findDebito(id:Number): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_DIVIDA_ATIVA_FIND_DEBITO}?id=${id}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }
}
