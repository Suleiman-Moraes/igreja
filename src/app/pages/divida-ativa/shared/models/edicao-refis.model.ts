import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { PercentualReducao } from './percentual-reducao.model';

export class EdicaoRefis extends BaseResourceModel{
    constructor(
        public anoEdicao?: string,
        public numeroParcela?: string,
        public descricao?: string,
        public dataCadastro?: string,
        public percentualReducaos?: PercentualReducao[]
    ){
        super();
    }

    static fromJson(jsonData: any): EdicaoRefis{
        return Object.assign(new EdicaoRefis(), jsonData);
    }
}