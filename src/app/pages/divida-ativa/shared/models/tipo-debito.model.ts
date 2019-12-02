import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class TipoDebito extends BaseResourceModel{
    constructor(
        public descricao?:string,
        public situacaoEnum?:string,
        public dataCadastro?:string,
    ){
        super();
    }

    static fromJson(jsonData: any): TipoDebito{
        return Object.assign(new TipoDebito(), jsonData);
    }
}