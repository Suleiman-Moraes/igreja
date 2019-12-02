import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class PercentualReducao extends BaseResourceModel{
    constructor(
        public numeroParcela?: string,
        public percentualReducao?: string,
        public coeficienteCalculo?: string,
        public edicaoRefisId?: number
    ){
        super();
    }

    static fromJson(jsonData: any): PercentualReducao{
        return Object.assign(new PercentualReducao(), jsonData);
    }
}