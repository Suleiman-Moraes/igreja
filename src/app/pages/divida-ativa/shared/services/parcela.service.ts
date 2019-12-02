import { catchError, map } from 'rxjs/operators';
import { DIVIDAATIVA_API_PARCELA, DIVIDAATIVA_API_PARCELA_NEXT } from './../dividaativa.api';
import { Injectable, Injector } from '@angular/core';
import { Parcela } from '../models/parcela.model';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService extends BaseResourceService<Parcela>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_PARCELA, injector, Parcela.fromJson);
  }

  obterProximaParcela(negociacaoId): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_PARCELA_NEXT}/${negociacaoId}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    );
  }
}
