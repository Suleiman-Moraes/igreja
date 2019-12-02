import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { TipoDebito } from './tipo-debito.model';
import { AreaAtuacao } from './area-atuacao.model';

export class CodigoReceita extends BaseResourceModel{
    constructor(
        public codigoReceita?:string,
        public subCodigoReceita?:string,
        public tipoDebito?:TipoDebito,
        public areaAtuacao?:AreaAtuacao,
    ){
        super();
    }

    static fromJson(jsonData: any): CodigoReceita{
        return Object.assign(new CodigoReceita(), jsonData);
    }
}