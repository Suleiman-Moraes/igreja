import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Endereco extends BaseResourceModel{
    constructor(
        public rua?: string,
        public quadra?: string,
        public lote?: string,
        public numero?: string,
        public setor?: string,
        public cidade?: string,
        public uf?: string,
        public cep?: string
    ){
        super();
    }

    static fromJson(jsonData: any): Endereco{
        return Object.assign(new Endereco(), jsonData);
    }
}