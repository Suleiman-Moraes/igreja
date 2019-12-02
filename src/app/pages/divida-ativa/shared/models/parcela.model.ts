import { Dare } from './dare.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Parcela extends BaseResourceModel {
    constructor(
        public dataVencimento?: Date,
        public valor?: number,
        public valorAtualizado?: number,
        public negociacaoId?: number,
        public dares?: Dare[]
    ) {
        super();
    }

    static fromJson(jsonData: any): Parcela {
        return Object.assign(new Parcela(), jsonData);
    }
}