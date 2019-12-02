import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class TermoAcordo extends BaseResourceModel{
    constructor(
        public numeroProcesso?: string,
        public situacao?: string,
        public dataCadastro?: Date
    ){
        super();
    }

    static fromJson(jsonData: any): TermoAcordo{
        return Object.assign(new TermoAcordo(), jsonData);
    }
}