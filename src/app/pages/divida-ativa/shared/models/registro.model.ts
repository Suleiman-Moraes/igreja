import { Anexo } from './anexo.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { SituacaoNotificacaoTramite } from './situacao-notificacao-tramite.model';

export class Registro extends BaseResourceModel{
    constructor(
        public descricao?: string,
        public nomeUsuarioReceptor?: string,
        public statusNotificacao?: boolean,
        public registroRetornado?: boolean,
        public dataRegistro?: Date,
        public unidadeRecebeuId?: number,
        public usuarioEmissorId?: number,
        public usuarioReceptorId?: number,
        public tramiteId?: number,
        public situacaoNotificacaoTramite?: SituacaoNotificacaoTramite,
        public anexos?: Anexo[],
        public dataPublicacaoDiarioOficial?: Date,
    ){
        super();
    }

    static situacaos = {
        ENCAMINHADO: 'Encaminhado',
        RETORNADO: 'Retornado'
    };

    static fromJson(jsonData: any): Registro{
        return Object.assign(new Registro(), jsonData);
    }
}