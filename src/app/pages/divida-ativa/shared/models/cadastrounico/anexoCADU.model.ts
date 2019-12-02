import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Devedor } from '../devedor.model';

export class AnexoCADU extends BaseResourceModel{
    constructor(
        public caminhoServidor?: string,
        public descricao?: string,
        public nome?: string,
        public anexadoEm?: Date,
        public validado?: boolean,
        public validadoEm?: Date,
        public devedor?: Devedor,
        public bytesSmbFile?: any,
        public bytes?: string,
        public status?: string,
        public pendencia?: string
    ){
        super();
    }

    static fromJson(jsonData: any): AnexoCADU{
        return Object.assign(new AnexoCADU(), jsonData);
    }
}