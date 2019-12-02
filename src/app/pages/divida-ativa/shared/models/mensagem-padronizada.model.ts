import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class MensagemPadronizada extends BaseResourceModel{
    constructor(
        public descricao?: string,
        public titulo?: string,
        public situacao?: string,
        public dataCadastro?: Date
    ){
        super();
    }

    static fromJson(jsonData: any): MensagemPadronizada{
        return Object.assign(new MensagemPadronizada(), jsonData);
    }
}