import { DIVIDAATIVA_API_AREA_ATUACAO, DIVIDAATIVA_API_AREA_ATUACAO_SITUACAO } from '../dividaativa.api';
import { Injector, Injectable } from '@angular/core';
import { AreaAtuacao } from '../models/area-atuacao.model';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { SituacaoEnum } from '../enums/situacao.enum';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AreaAtuacaoService extends BaseResourceService<AreaAtuacao>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_AREA_ATUACAO, injector, AreaAtuacao.fromJson);
  }

  findBySituacao(situacao?: string): Observable<ResponseApi> {
    situacao = situacao ? situacao : SituacaoEnum.Ativo;
    return this.http.get(`${DIVIDAATIVA_API_AREA_ATUACAO_SITUACAO}?situacao=${situacao}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }
}
