import { map, catchError } from 'rxjs/operators';
import { DIVIDAATIVA_API_NEGOCIACAO, DTO, DIVIDAATIVA_API_NEGOCIACAO_GERARSIMULACAOTAC, DIVIDAATIVA_API_NEGOCIACAO_GERARTAC, DIVIDAATIVA_API_NEGOCIACAO_NEXTPARCELA, DIVIDAATIVA_API_NEGOCIACAO_TERMO, DIVIDAATIVA_API_NEGOCIACAO_GERARSIMULACAOTAD, DIVIDAATIVA_API_NEGOCIACAO_GERARTAD, DIVIDAATIVA_API_NEGOCIACAO_DEBITO, DIVIDAATIVA_API_NEGOCIACAO_NAOEXTINTO } from './../dividaativa.api';
import { Negociacao } from './../models/negociacao.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api.model';
import { NegociacaoAnexoDTO } from '../models/dto/negociacao-anexo-dto.model';

@Injectable({
  providedIn: 'root'
})
export class NegociacaoService extends BaseResourceService<Negociacao>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_NEGOCIACAO, injector, Negociacao.fromJson);
  }

  findDtoByIds(id, debitoId): Observable<ResponseApi> {
    return this.http.get(`${this.apiPath + DTO}?id=${id}&debitoId=${debitoId}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  atualizarProcessoSeiTermo(id, sei): Observable<ResponseApi> {
    return this.http.put(`${DIVIDAATIVA_API_NEGOCIACAO_TERMO}?id=${id}&sei=${sei}`, null).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  obterProximaParcela(id): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_NEGOCIACAO_NEXTPARCELA}/${id}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  gerarSimulacaoTac(ids: any[], data: Date): Observable<ResponseApi> {
    let lIds: string = '';
    ids.forEach(id => lIds += `&ids=${id}`);
    lIds = lIds.replace(/^&/, '?');
    return this.http.get(`${DIVIDAATIVA_API_NEGOCIACAO_GERARSIMULACAOTAC}${lIds}&data=${data}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  gerarSimulacaoTad(ids: any[], data: Date, qtd: number): Observable<ResponseApi> {
    let lIds: string = '';
    ids.forEach(id => lIds += `&ids=${id}`);
    lIds = lIds.replace(/^&/, '?');
    return this.http.get(`${DIVIDAATIVA_API_NEGOCIACAO_GERARSIMULACAOTAD}${lIds}&data=${data}&qtd=${qtd}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  gerarTac(ids: any[], data: Date, par: number, entrada: number, negociacaoAnexoDTO: NegociacaoAnexoDTO): Observable<ResponseApi> {
    let lIds: string = '';
    ids.forEach(id => lIds += `&ids=${id}`);
    lIds = lIds.replace(/^&/, '?');
    return this.http.post(`${DIVIDAATIVA_API_NEGOCIACAO_GERARTAC}${lIds}&data=${data}&par=${par}&entrada=${entrada}`, negociacaoAnexoDTO).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  findByDebitosId(id): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_NEGOCIACAO_DEBITO}/${id}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  buscarNaoExtintoPorId(id): Observable<ResponseApi> {
    return this.http.get(`${DIVIDAATIVA_API_NEGOCIACAO_NAOEXTINTO}/${id}`).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }

  gerarTad(ids: any[], data: Date, par: number, negociacaoAnexoDTO: NegociacaoAnexoDTO): Observable<ResponseApi> {
    let lIds: string = '';
    ids.forEach(id => lIds += `&ids=${id}`);
    lIds = lIds.replace(/^&/, '?');
    return this.http.post(`${DIVIDAATIVA_API_NEGOCIACAO_GERARTAD}${lIds}&data=${data}&par=${par}`, negociacaoAnexoDTO).pipe(
      map(this.fromJsonResponseApi.bind(this)),
      catchError(this.handleError)
    )
  }
}
