import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class TermoAdesao extends BaseResourceModel{
    constructor(
        public numeroProcesso?: string,
        public situacao?: string,
        public dataCadastro?: Date
    ){
        super();
    }

    static fromJson(jsonData: any): TermoAdesao{
        return Object.assign(new TermoAdesao(), jsonData);
    }
}