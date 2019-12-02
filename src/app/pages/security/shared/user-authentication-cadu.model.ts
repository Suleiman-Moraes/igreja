import { UserLogado } from './user-logado.model';
import { Perfil } from './perfil.model';
import { Usuario } from '../../divida-ativa/shared/models/usuario.model';

export class UserAuthenticationCadu{
    constructor(
        public id?: number,
        public nome?: string,
        public login?: string,
        public email?: string,
        public senha?: string,
        public confirmaSenha?: string,
        public ativo?: boolean,
        public usuarioInterno?: boolean,
        public senhaTemporaria?: boolean,
        public lembreMe?: string,
        public token?: string,
        public perfis?: Perfil[]
    ){}

    static fromJson(jsonData: any): UserAuthenticationCadu{
        return Object.assign(new UserAuthenticationCadu(), jsonData); 
    }

    static parseUsuario(userLogado: UserLogado): UserAuthenticationCadu{
        const usuario: Usuario = userLogado.user;
        return new UserAuthenticationCadu(usuario.id, usuario.nome, usuario.login, usuario.email ? usuario.email.email : '',
            usuario.senha, usuario.senha, usuario.ativo, usuario.usuarioInterno, usuario.senhaTemporaria,
            '', userLogado.token, usuario.perfis);
    }
}