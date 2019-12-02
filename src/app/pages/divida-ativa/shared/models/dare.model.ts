import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Dare extends BaseResourceModel {
    constructor(
        public numeroDare?: string,
        public dataPagamento?: Date,
        public dataEmissao?: Date,
        public valor?: number,
        public debitoId?: number,
        public parcelaId?: number
    ) {
        super();
    }

    static fromJson(jsonData: any): Dare {
        return Object.assign(new Dare(), jsonData);
    }
}