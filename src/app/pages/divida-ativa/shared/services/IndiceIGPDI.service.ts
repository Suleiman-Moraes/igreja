import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { IndiceIGPDI } from '../models/IndiceIGPDI.model';
import { DIVIDAATIVA_API_INDICE_IGPDI, DIVIDAATIVA_API_INDICE_IGPDI_FINDBYPARAMSFILTER, DIVIDAATIVA_API_INDICE_IGPDI_FINDLASTMULTIPLICADOR, DIVIDAATIVA_API_INDICE_IGPDI_FINDLASTMESANO } from '../dividaativa.api';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndiceIGPDIService extends BaseResourceService<IndiceIGPDI>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_INDICE_IGPDI, injector, IndiceIGPDI.fromJson);
  }
  
  findByParamsFilter(page: number, count: number, id: number, mesAno: string, indiceMes: string, multiplicadorIgpdi: string, coeficienteAcumulado: string): Observable<ResponseApi> {
    return this.http.get
      (`${DIVIDAATIVA_API_INDICE_IGPDI_FINDBYPARAMSFILTER}?page=${page}&count=${count}&id=${id}&mesAno=${mesAno}&indiceMes=${indiceMes}&multiplicadorIgpdi=${multiplicadorIgpdi}&coeficienteAcumulado=${coeficienteAcumulado}`)
      .pipe(
        map(this.fromJsonResponseApi.bind(this)),
        catchError(this.handleError)
      );
  }
  
  findLastMultiplicador(): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_INDICE_IGPDI_FINDLASTMULTIPLICADOR}`)
      .pipe(
        map(this.fromJsonResponseApi.bind(this)),
        catchError(this.handleError)
      );
  }
  
  findLastMesAno(): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_INDICE_IGPDI_FINDLASTMESANO}`)
      .pipe(
        map(this.fromJsonResponseApi.bind(this)),
        catchError(this.handleError)
      );
  }
}
