import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Debito } from './debito.model';

export class DividaAtiva extends BaseResourceModel{
    constructor(
        public dataCalculo?: string,
        public valorDividaAtiva?: Number,
        public debito?: Debito,
        public visualizado?: boolean,
    ){
        super();
    }

    static fromJson(jsonData: any): DividaAtiva{
        return Object.assign(new DividaAtiva(), jsonData);
    }
}