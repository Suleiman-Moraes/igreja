import { DIVIDAATIVA_API_SITUACAO_NOTIFICACAO_TRAMITE_SITUACAO } from './../dividaativa.api';
import { map, catchError } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { DIVIDAATIVA_API_SITUACAO_NOTIFICACAO_TRAMITE } from '../dividaativa.api';
import { SituacaoNotificacaoTramite } from '../models/situacao-notificacao-tramite.model';
import { SituacaoEnum } from '../enums/situacao.enum';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api.model';

@Injectable({
  providedIn: 'root'
})
export class SituacaoNotificacaoTramiteService extends BaseResourceService<SituacaoNotificacaoTramite>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_SITUACAO_NOTIFICACAO_TRAMITE, injector, SituacaoNotificacaoTramite.fromJson);
  }

  findBySituacao(situacao?: string): Observable<ResponseApi> {
    situacao = situacao ? situacao : SituacaoEnum.Ativo;
    return this.http.get(`${DIVIDAATIVA_API_SITUACAO_NOTIFICACAO_TRAMITE_SITUACAO}?situacao=${situacao}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }
}
