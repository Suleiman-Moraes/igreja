import { DIVIDAATIVA_API_EDICAOREFIS_SITUACAO } from './../dividaativa.api';
import { map, catchError } from 'rxjs/operators';
import { DIVIDAATIVA_API_EDICAOREFIS } from '../dividaativa.api';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { EdicaoRefis } from '../models/edicao-refis.model';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api.model';

@Injectable({
  providedIn: 'root'
})
export class EdicaoRefisService extends BaseResourceService<EdicaoRefis>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_EDICAOREFIS, injector, EdicaoRefis.fromJson);
  }

  findTopBySituacao(): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_EDICAOREFIS_SITUACAO}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    );
  }
}
