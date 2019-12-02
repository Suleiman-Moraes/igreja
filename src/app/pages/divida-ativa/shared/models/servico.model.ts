import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Servico extends BaseResourceModel{
    constructor(
        public nome?: string,
        public descricao?: string,
        public ativo?: Boolean
    ){
        super();
    }

    static fromJson(jsonData: any): Servico{
        return Object.assign(new Servico(), jsonData);
    }
}