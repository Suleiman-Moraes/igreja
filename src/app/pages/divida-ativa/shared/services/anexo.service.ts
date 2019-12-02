import { map, catchError } from 'rxjs/operators';
import { DIVIDAATIVA_API_ANEXO, DIVIDAATIVA_API_ANEXO_VER } from './../dividaativa.api';
import { Anexo } from './../models/anexo.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api.model';

@Injectable({
  providedIn: 'root'
})
export class AnexoService extends BaseResourceService<Anexo>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_ANEXO, injector, Anexo.fromJson);
  }

  verAnexo(id): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_ANEXO_VER}?i=${id}&c=`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }
}
