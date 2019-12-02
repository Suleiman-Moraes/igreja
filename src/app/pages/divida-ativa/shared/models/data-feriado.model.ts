import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class DataFeriado extends BaseResourceModel{
    constructor(
        public dataFeriadoFixo?:string,
        public dataFeriadoVariavel?:Date,
        public descricao?:string,
    ){
        super();
    }

    static fromJson(jsonData: any): DataFeriado{
        return Object.assign(new DataFeriado(), jsonData);
    }
}