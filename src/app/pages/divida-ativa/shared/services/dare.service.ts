import { DIVIDAATIVA_API_DARE, DIVIDAATIVA_API_DARE_EMITIRDARESBYDEBITOS, DIVIDAATIVA_API_DARE_ID } from './../dividaativa.api';
import { map, catchError } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Dare } from '../models/dare.model';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DareService extends BaseResourceService<Dare>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_DARE, injector, Dare.fromJson);
  }

  emitirDare(ids: any[], data: Date): Observable<ResponseApi> {
    let lIds: string = '';
    ids.forEach(id => lIds += `&ids=${id}`);
    lIds = lIds.replace(/^&/, '?');
    return this.http.get(`${DIVIDAATIVA_API_DARE_EMITIRDARESBYDEBITOS}${lIds}&data=${data}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  findByIdEspecial(id): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_DARE_ID}/${id}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }
}
