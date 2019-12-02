import { Usuario } from '../../igreja/shared/models/usuario.model';

export class UserLogado{
    constructor(
        public token?: string,
        public user?: Usuario,
        public roles?: string[]
    ){}
}