import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Modulo } from '../../divida-ativa/shared/models/modulo.model';
import { Permissao } from '../../divida-ativa/shared/models/permissao.model';

export class Perfil extends BaseResourceModel{
    constructor(
        public nome?: string,
        public descricao?: string,
        public apresentacao?: string,
        public tipoAcesso?: boolean,
        public ativo?: boolean,
        public modulo?: Modulo,
        public permissoes?: Permissao[]
    ){
        super();
    }

    static fromJson(jsonData: any): Perfil{
        return Object.assign(new Perfil(), jsonData);
    }
}