import { DIVIDAATIVA_API_PESSOACADU_CNPJCPFCEI, DIVIDAATIVA_API_PESSOACADU_CPFORCEIORCNPJNOFILTER } from './../dividaativa.api';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaCaduService {

  constructor(
    private http: HttpClient
  ){}

  findByCnpjCpfCei(ccc: string): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_PESSOACADU_CNPJCPFCEI}/?ccc=${ccc}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    );
  }

  findByCnpjCpfCeiNoFilter(ccc: string): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_PESSOACADU_CPFORCEIORCNPJNOFILTER}/?ccc=${ccc}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    );
  }

  //PRIVATE METHODS
  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  } 

  private fromJsonResponseApi(jsonData: any): ResponseApi {
    return Object.assign(new ResponseApi(), jsonData);
  }
}
