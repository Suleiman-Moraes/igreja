import { map, catchError } from 'rxjs/operators';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { DIVIDAATIVA_API_ITEMCHECKLIST, DIVIDAATIVA_API_ITEMCHECKLIST_FINDBYPARAMSFILTER } from './../dividaativa.api';
import { Injectable, Injector } from '@angular/core';
import { ItemChecklist } from '../models/item-checklist.model';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemChecklistService extends BaseResourceService<ItemChecklist>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_ITEMCHECKLIST, injector, ItemChecklist.fromJson);
  }

  findByParamsFilter(page: number, count: number, id: number, descricao: string, situacao: string): Observable<ResponseApi> {
    return this.http.get
      (`${DIVIDAATIVA_API_ITEMCHECKLIST_FINDBYPARAMSFILTER}?page=${page}&count=${count}&id=${id}&descricao=${descricao}&situacao=${situacao}`)
      .pipe(
        map(this.fromJsonResponseApi.bind(this)),
        catchError(this.handleError)
      );
  }
}
