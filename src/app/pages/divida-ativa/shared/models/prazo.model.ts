import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Prazo extends BaseResourceModel{
    constructor(
        public nome?: string,
        public descricao?: string,
        public situacao?: string,
        public prazo?: number
    ){
        super();
    }

    static fromJson(jsonData: any): Prazo{
        return Object.assign(new Prazo(), jsonData);
    }
}