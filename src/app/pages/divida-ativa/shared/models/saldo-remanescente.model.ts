import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class SaldoRemanescente extends BaseResourceModel{
    constructor(
        public saldo?: number,
        public observacao?: string,
        public devedorId?: number,
    ){
        super();
    }

    static fromJson(jsonData: any): SaldoRemanescente{
        return Object.assign(new SaldoRemanescente(), jsonData);
    }
}