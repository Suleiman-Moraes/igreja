import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { TermoAdesao } from './termo-adesao.model';
import { TermoAcordo } from './termo-acordo.model';
import { Debito } from './debito.model';
import { Parcela } from './parcela.model';

export class Negociacao extends BaseResourceModel {
    constructor(
        public qtdParcela?: number,
        public valorNegociado?: number,
        public termoAdesao?: TermoAdesao,
        public termoAcordo?: TermoAcordo,
        public debitos?: Debito[],
        public parcelas?: Parcela[]
    ) {
        super();
    }

    static fromJson(jsonData: any): Negociacao {
        return Object.assign(new Negociacao(), jsonData);
    }
}