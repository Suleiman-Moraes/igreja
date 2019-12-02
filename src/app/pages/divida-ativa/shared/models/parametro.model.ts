import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Parametro extends BaseResourceModel{
    constructor(
        public tipoParametro?: string,
        public valor?: string
    ){
        super();
    }

    static fromJson(jsonData: any): Parametro{
        return Object.assign(new Parametro(), jsonData);
    }
}