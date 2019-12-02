import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Usuario extends BaseResourceModel{
    constructor(
        public login?: string,
        public senha?: string,
        public confirmarSenha?: string,
        public nome?: string,
        public ativo?: boolean,
        public matricula?: string,
        public usuarioInterno?: boolean,
        public senhaTemporaria?: boolean,
        public telefone?: any,
        public email?: any,
        public pessoaJuridica?: any,
        public pessoaFisica?: any,
        public unidade?: any,
        public perfis?: any[],
        public dataInclusao?: Date,
        public vincularPessoa?: boolean
    ){
        super();
    }

    static fromJson(jsonData: any): Usuario{
        return Object.assign(new Usuario(), jsonData);
    }
}