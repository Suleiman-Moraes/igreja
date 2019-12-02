import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class AreaAtuacao extends BaseResourceModel{
    constructor(
        public descricao?:string,
        public situacaoEnum?:string,
        public dataCadastro?:string,
    ){
        super();
    }

    static fromJson(jsonData: any): AreaAtuacao{
        return Object.assign(new AreaAtuacao(), jsonData);
    }
}