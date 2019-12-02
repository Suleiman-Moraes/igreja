import { catchError, map } from 'rxjs/operators';
import { DIVIDAATIVA_API_DEBITO, DIVIDAATIVA_API_DEBITO_FINDBYPARAMSFILTER, DIVIDAATIVA_API_DEBITO_CHECKLISTDTO, DIVIDAATIVA_API_DEBITO_ASSUMIRANALISE, DIVIDAATIVA_API_DEBITO_DTONEGOCIACAODETALHE, DIVIDAATIVA_API_DEBITO_DEBITONEGOCIACAOPIDTO, DIVIDAATIVA_API_DEBITO_FINDBYPARAMSFORDIVIDA, DIVIDAATIVA_API_DEBITO_INSCRVERDIVIDA } from './../dividaativa.api';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Debito } from '../models/debito.model';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebitoService extends BaseResourceService<Debito>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_DEBITO, injector, Debito.fromJson);
  }

  findByParamsFilter(page: number, count: number, de: string, ate: string, ccc: string,
    np: string, rn: string, nai: string, porUnidade: boolean, financas: boolean): Observable<ResponseApi> {
    porUnidade = porUnidade != null ? porUnidade : false;
    return this.http.get
      (`${DIVIDAATIVA_API_DEBITO_FINDBYPARAMSFILTER}?page=${page}&count=${count}&de=${de}&ate=${ate}&ccc=${ccc}&np=${np}&rn=${rn}&nai=${nai}&porUnidade=${porUnidade}&financas=${financas}`)
      .pipe(
        map(this.fromJsonResponseApi.bind(this)),
        catchError(this.handleError)
      );
  }

  paginarComParametrosAptosParaInscricaoEmDivida(page: number, count: number): Observable<ResponseApi> {
    return this.http.get
      (`${DIVIDAATIVA_API_DEBITO_FINDBYPARAMSFORDIVIDA}?page=${page}&count=${count}`)
      .pipe(
        map(this.fromJsonResponseApi.bind(this)),
        catchError(this.handleError)
      );
  }

  findChecklistDtoById(id): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_DEBITO_CHECKLISTDTO}/${id}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  insertInDivida(id): Observable<ResponseApi> {
    return this.http.put(`${DIVIDAATIVA_API_DEBITO_INSCRVERDIVIDA}/${id}`, null).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  findDebitoNegociacaoPiDtoById(ids: any[]): Observable<ResponseApi> {
    let lIds: string = '';
    ids.forEach(id => lIds += `&ids=${id}`);
    lIds = lIds.replace(/^&/, '?');
    return this.http.get(`${DIVIDAATIVA_API_DEBITO_DEBITONEGOCIACAOPIDTO}${lIds}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  assumirAnalise(id): Observable<ResponseApi> {
    return this.http.put(`${DIVIDAATIVA_API_DEBITO_ASSUMIRANALISE}/${id}`, null).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  updateChecklistDto(dto): Observable<ResponseApi> {
    return this.http.put(`${DIVIDAATIVA_API_DEBITO_CHECKLISTDTO}`, dto).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  findDebitoNegociacaoDetalheDtoById(id): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_DEBITO_DTONEGOCIACAODETALHE}/${id}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }
}
