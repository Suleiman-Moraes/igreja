import { DIVIDAATIVA_API_UNIDADECADU_FINDNOMEID_SITUACAO, DIVIDAATIVA_API_UNIDADECADU_FINDNOMEID_SITUACAO_IDNOTIN, DIVIDAATIVA_API_UNIDADECADU_FINDNOMEID_ID } from './../dividaativa.api';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnidadeCaduService {

  constructor(
    private http: HttpClient
  ) { }

  findNomeIdById(id: number): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_UNIDADECADU_FINDNOMEID_ID}?id=${id}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  findNomeIdBySituacao(): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_UNIDADECADU_FINDNOMEID_SITUACAO}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  findNomeIdBySituacaoAndIdNotIn(id: number, debitoId: number): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_UNIDADECADU_FINDNOMEID_SITUACAO_IDNOTIN}?id=${id}&debitoId=${debitoId}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  private fromJsonResponseApi(jsonData: any): ResponseApi {
    return Object.assign(new ResponseApi(), jsonData);
  }

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }
}
