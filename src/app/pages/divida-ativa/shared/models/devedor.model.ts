import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Endereco } from './endereco.model';

export class Devedor extends BaseResourceModel{
    constructor(
        public cnpjCpfCei?: string,
        public razaoSocialNome?: string,
        public inscricaoEstadual?: string,
        public telefone?: string,
        public email?: string,
        public observacao?: string,
        public enderecos?: Endereco[]
    ){
        super();
    }

    static fromJson(jsonData: any): Devedor{
        return Object.assign(new Devedor(), jsonData);
    }
}