import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Uf } from './uf.model';

export class Endereco extends BaseResourceModel{
    constructor(
        public cep?: string,
        public cidade?: string,
        public bairro?: string,
        public logradouro?: string,
        public complemento?: string,
        public observacao?: string,
        public numero?: Number,
        public latitude?: Number,
        public longitude?: Number,
        public uf?: Uf
    ){
        super();
    }

    static fromJson(jsonData: any): Endereco{
        return Object.assign(new Endereco(), jsonData);
    }
}