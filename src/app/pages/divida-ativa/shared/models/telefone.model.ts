import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Telefone extends BaseResourceModel{
    constructor(
        public numero?: string,
        public observacao?: string,
        public tipoTelefoneEnum?: string
    ){
        super();
    }

    static fromJson(jsonData: any): Telefone{
        return Object.assign(new Telefone(), jsonData);
    }

    static types = {
        FIXO: 'Fixo',
        CELULAR: 'Celular'
    };

    static typesName = {
        FIXO: 'FIXO',
        CELULAR: 'CELULAR'
    };
}