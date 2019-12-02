import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Perfil } from '../../../security/shared/perfil.model';
import { Telefone } from './telefone.model';
import { Email } from './email.model';
import { PessoaJuridica } from './pessoa-juridica.model';
import { PessoaFisica } from './pessoa-fisica.model';
import { Unidade } from './unidade.model.';

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
        public telefone?: Telefone,
        public email?: Email,
        public pessoaJuridica?: PessoaJuridica,
        public pessoaFisica?: PessoaFisica,
        public unidade?: Unidade,
        public perfis?: Perfil[],
        public dataInclusao?: Date,
        public vincularPessoa?: boolean
    ){
        super();
    }

    static fromJson(jsonData: any): Usuario{
        return Object.assign(new Usuario(), jsonData);
    }
}