import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Devedor } from '../devedor.model';

export class DebitoDTO extends BaseResourceModel{
    constructor(
        public numeroProcesso?: string,
        public lote?: string,
        public caixaArquivo?: string,
        public numeroAutoInfracao?: string,
        public nomeUsuario?: string,
        public origemCadastro?: string,
        public areaAtuacao?: number,
        public naturezaDivida?: string,
        public situacao?: string,
        public usuarioId?: number,
        public valor?: number,
        public tipoDebito?: number,
        public dataCadastro?: Date,
        public devedor?: Devedor,
        public veiculoRemovido?:boolean,
        public dataRemocaoVeiculo?:Date,
    ){
        super();
    }

    static fromJson(jsonData: any): DebitoDTO{
        return Object.assign(new DebitoDTO(), jsonData);
    }
}