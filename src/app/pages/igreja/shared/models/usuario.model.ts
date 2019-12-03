import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Permissao } from './permissao.model';
import { Membro } from './membro.model';

export class Usuario extends BaseResourceModel{
    constructor(
        public login?: string,
        public nome?: string,
        public senha?: string,
        public ativo?: boolean,
        public dataInclusao?: Date,
        public membro?: Membro,
        public permissoes?: Permissao[]
    ){
        super();
    }

    static fromJson(jsonData: any): Usuario{
        return Object.assign(new Usuario(), jsonData);
    }
}