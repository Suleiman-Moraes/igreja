import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { SituacaoNotificacaoTramite } from '../models/situacao-notificacao-tramite.model';
import { TipoDebito } from '../models/tipo-debito.model';
import { DIVIDAATIVA_API_TIPO_DEBITO, DIVIDAATIVA_API_TIPO_DEBITO_SITUACAO } from '../dividaativa.api';
import { SituacaoEnum } from '../enums/situacao.enum';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDebitoService extends BaseResourceService<TipoDebito>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_TIPO_DEBITO, injector, SituacaoNotificacaoTramite.fromJson);
  }

  findBySituacao(situacao?: string): Observable<ResponseApi> {
    situacao = situacao ? situacao : SituacaoEnum.Ativo;
    return this.http.get(`${DIVIDAATIVA_API_TIPO_DEBITO_SITUACAO}?situacao=${situacao}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }
}
