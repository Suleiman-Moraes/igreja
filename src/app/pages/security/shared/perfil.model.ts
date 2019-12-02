import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Perfil extends BaseResourceModel{
    constructor(
        public nome?: string,
        public descricao?: string,
        public apresentacao?: string,
        public tipoAcesso?: boolean,
        public ativo?: boolean,
        public modulo?: any,
        public permissoes?: any[]
    ){
        super();
    }

    static fromJson(jsonData: any): Perfil{
        return Object.assign(new Perfil(), jsonData);
    }
}