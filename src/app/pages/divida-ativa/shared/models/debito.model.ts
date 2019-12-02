import { TipoDebito } from './tipo-debito.model';
import { Devedor } from './devedor.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { ItemChecklist } from './item-checklist.model';
import { AreaAtuacao } from './area-atuacao.model';

export class Debito extends BaseResourceModel{
    constructor(
        public numeroProcesso?: string,
        public lote?: string,
        public caixaArquivo?: string,
        public numeroAutoInfracao?: string,
        public origemCadastro?: string,
        public areaAtuacao?: AreaAtuacao,
        public situacao?: string,
        public nomeUsuario?: string,
        public situacaoChecklist?: string,
        public naturezaDivida?: string,
        public valor?: number,
        public usuarioId?: number,
        public visualizado?: boolean,
        public dataAtualizacao?: Date,
        public dataCadastro?: Date,
        public dataRealizacaoChecklist?: Date,
        public tipoDebito?: TipoDebito,
        public devedor?: Devedor,
        public checklists?: ItemChecklist[],
        public veiculoRemovido?:boolean,
        public isAtrasoTramite?:boolean,
        public isAtrasoNotificacao?:boolean,
        public dataRemocaoVeiculo?:Date,
    ){
        super();
    }

    static situacaoChecklists = {
        DOCUMENTACAO_VALIDADA: 'Documentação Validada',
        DOCUMENTACAO_IMPUGNADA: 'Documentação Impugnada'
    };

    static naturezaDividas = {
        NAO_TRIBUTARIA: 'Não Tributária',
        TRIBUTARIA: 'Tributária'
    };

    static origemCadastros = {
        SISTEMA_S506: 'Sistema s506',
        AGR_FISCAL: 'AGR Fiscal',
        SEI: 'SEI'
    };

    static origemCadastrosToCadastro = {
        SISTEMA_S506: 'Sistema s506',
        SEI: 'SEI'
    };

    static tipoDebitos = {
        AIT: 'AIT',
        TRCF: 'TRCF',
        OUTORGA: 'Outorga',
        AIS: 'AIS', 
	    AIE: 'AIE',
        CONCESSOES: 'Concessões'
    };

    static areaAtuacaos = {
        REGULAR: 'Regular',
        VINCULADO: 'Vinculado',
        ESCOLAR: 'Escolar',
        TURISMO: 'Turismo',
        CLANDESTINO: 'Clandestino',
        SANEAMENTO: 'Saneamento',
        ENERGIA: 'Energia',
        REGULACAO_ECONOMICO_DESESTATIZACAO: 'Regulação Econômico e Desestatização'
    };

    static situacaos = {
        NAO_QUITADO: 'Não Quitado',
        CADASTRO_VALIDADO: 'Cadastro Validado',
        CADASTRO_RECUSADO: 'Cadastro Recusado',
        PRESCRITO: 'Prescrito',
        SUSPENSAO_JUDICIAL: 'Suspensão Judicial',
        ANULADO: 'Anulado',
        QUITADO: 'Quitado',
        INSCRITO_DA_NAO_AJUIZADO: 'Inscrito em DA e não ajuizado', 
        INSCRITO_DA_AJUIZADO_EXECUCAO_FISCAL: 'Inscrito em DA e ajuizado (em execução Fiscal)', 
        TAC_PARCELAMENTO_ABERTO_VENCER: 'TAC - Parcelamento em aberto (a vencer)', 
        TAD_PARCELAMENTO_ABERTO_VENCER: 'TAD - Parcelamento em aberto (a vencer)', 
        TAC_PARCELAMENTO_ATRASO_VENCIDAS: 'TAC - Parcelamento em atraso (vencidas)', 
        TAD_PARCELAMENTO_ATRASO_VENCIDAS: 'TAD - Parcelamento em atraso (vencidas)'
    };

    static fromJson(jsonData: any): Debito{
        return Object.assign(new Debito(), jsonData);
    }
}