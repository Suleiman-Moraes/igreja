import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Registro } from './registro.model';

export class Tramite extends BaseResourceModel{
    constructor(
        public nomeUnidadeEnviou?: string,
        public nomeUnidadeRecebeu?: string,
        public nomeUsuarioEnviou?: string,
        public situacaoTramite?: string,
        public unidadeEnviouId?: number,
        public unidadeRecebeuId?: number,
        public usuarioEnviouId?: number,
        public debitoId?: number,
        public dataRespostaRegistroTramite?: Date,
        public dataEnvioRegistroTramite?: Date,
        public dataCriacaoTramite?: Date,
        public dataPublicacaoDiarioOficial?: Date,
        public registros?: Registro[]
    ){
        super();
    }

    static situacaos = {
        ENCAMINHADO: 'Encaminhado',
        RETORNADO: 'Retornado'
    };

    static fromJson(jsonData: any): Tramite{
        return Object.assign(new Tramite(), jsonData);
    }
}