import { Anexo } from '../anexo.model';

export class NegociacaoAnexoDTO {
    constructor(
        public texto?: string,
        public anexos?: Anexo[]
    ){}

    static fromJson(jsonData: any): NegociacaoAnexoDTO{
        return Object.assign(new NegociacaoAnexoDTO(), jsonData);
    }
}