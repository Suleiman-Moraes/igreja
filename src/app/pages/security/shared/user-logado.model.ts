import { Usuario } from '../../divida-ativa/shared/models/usuario.model';

export class UserLogado{
    constructor(
        public token?: string,
        public user?: Usuario,
        public roles?: string[]
    ){}
}