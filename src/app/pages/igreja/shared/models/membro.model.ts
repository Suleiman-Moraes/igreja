import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

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
        public endereco?: any
    ){
        super();
    }

    static fromJson(jsonData: any): Membro{
        return Object.assign(new Membro(), jsonData);
    }
}