import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { SituacaoExecucaoFiscalEnum } from '../enums/situacao-execucao-fiscal.enum';
import { DividaAtiva } from './divida-ativa.model';

export class ExecucaoFiscal extends BaseResourceModel{
    constructor(
        public observacao?: string,
        public processo?: string,
        public situacao?: SituacaoExecucaoFiscalEnum,
        public dividaAtiva?: DividaAtiva,
        public dataCadastro?: Date,
    ){
        super();
    }

    static fromJson(jsonData: any): ExecucaoFiscal{
        return Object.assign(new ExecucaoFiscal(), jsonData);
    }
}