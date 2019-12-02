import { SituacaoEnum } from 'src/app/pages/divida-ativa/shared/enums/situacao.enum';
import { map, catchError } from 'rxjs/operators';
import { DIVIDAATIVA_API_MENSAGEM_PADRONIZADA_SITUACAO } from './../dividaativa.api';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { MensagemPadronizada } from '../models/mensagem-padronizada.model';
import { DIVIDAATIVA_API_MENSAGEM_PADRONIZADA } from '../dividaativa.api';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api.model';

@Injectable({
  providedIn: 'root'
})
export class MensagemPadronizadaService extends BaseResourceService<MensagemPadronizada>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_MENSAGEM_PADRONIZADA, injector, MensagemPadronizada.fromJson);
  }

  findBySituacao(situacao?: string): Observable<ResponseApi> {
    situacao = situacao ? situacao : SituacaoEnum.Ativo;
    return this.http.get(`${DIVIDAATIVA_API_MENSAGEM_PADRONIZADA_SITUACAO}?situacao=${situacao}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }
}
