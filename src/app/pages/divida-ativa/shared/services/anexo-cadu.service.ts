import { DIVIDAATIVA_API_ANEXO_CADU_FIND_BY_PESSOA } from './../dividaativa.api';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnexoCADUService {

    constructor(
      private http: HttpClient
    ){}

    findAnexosCADU(ccc: string): Observable<ResponseApi> {
      return this.http.get(`${DIVIDAATIVA_API_ANEXO_CADU_FIND_BY_PESSOA}/?ccc=${ccc}`).pipe(
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
