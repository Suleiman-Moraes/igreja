import { DIVIDAATIVA_API_EXECUCAO_FISCAL, DIVIDAATIVA_API_FIND_IN_LIST, DIVIDAATIVA_API_FIND_ID, DIVIDAATIVA_API_FIND_BY_PARAMS } from './../dividaativa.api';
import { Injectable, Injector } from '@angular/core';
import { ItemChecklist } from '../models/item-checklist.model';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { ExecucaoFiscal } from '../models/execucao-fiscal.model';
import { DividaAtivaModule } from '../../divida-ativa.module';
import { DividaAtiva } from '../models/divida-ativa.model';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExecucaoFiscalService extends BaseResourceService<ExecucaoFiscal>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_EXECUCAO_FISCAL, injector, ExecucaoFiscal.fromJson);
  }

  findInList(dividaAtiva: DividaAtiva[]): Observable<ResponseApi> {
    return this.http.post(`${DIVIDAATIVA_API_FIND_IN_LIST}`, dividaAtiva).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    );
  }

  findId(id:string): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_FIND_ID}?id=${id}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    );
  }

  findByParamsFilter(page: number, count: number, de: string, ate: string, ccc: string, np: string, rn: string, nai: string, arg8: boolean, sit: string) {
    return this.http.get
      (`${DIVIDAATIVA_API_FIND_BY_PARAMS}?page=${page}&count=${count}&de=${de}&ate=${ate}&ccc=${ccc}&np=${np}&rn=${rn}&nai=${nai}&financas=${arg8}&situacao=${sit}`)
      .pipe(
        map(this.fromJsonResponseApi.bind(this)),
        catchError(this.handleError)
      );
  }
}
