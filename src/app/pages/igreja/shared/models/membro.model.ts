import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Endereco } from './endereco.model';

export class Membro extends BaseResourceModel{
    constructor(
        public nome?: string,
        public cpf?: string,
        public telefone?: string,
        public email?: string,
        public sexo?: boolean,
        public situacao?: string,
        public tipo?: string,
        public dataNascimento?: Date,
        public dataInclusao?: Date,
        public endereco?: Endereco
    ){
        super();
    }

    static tipoMembroEnums = {
        MEMBRO: 'Membro',
        TESOUREIRO: 'Tesoureir(a)',
        PASTOR_DIRIGENTE: 'Pastor(a) Dirigente'
    };

    static fromJson(jsonData: any): Membro{
        return Object.assign(new Membro(), jsonData);
    }
}