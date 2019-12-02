import { Anexo } from './anexo.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { SituacaoNotificacaoTramite } from './situacao-notificacao-tramite.model';

export class RegistroExterno extends BaseResourceModel{
    constructor(
        public descricao?: string,
        public nomeUsuario?: string,
        public dataRegistro?: Date,
        public usuarioId?: number,
        public debitoId?: number,
        public situacaoNotificacaoTramite?: SituacaoNotificacaoTramite,
        public anexos?: Anexo[]
    ){
        super();
    }

    static fromJson(jsonData: any): RegistroExterno{
        return Object.assign(new RegistroExterno(), jsonData);
    }
}