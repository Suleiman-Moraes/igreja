import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class IndiceIGPDI extends BaseResourceModel{
    constructor(
        private mesAno?:string,
        private indiceMes?:string,
        private multiplicadorIgpdi?:string,
        private coeficienteAcumulado?:string,
    ){
        super();
    }

    static fromJson(jsonData: any): IndiceIGPDI{
        return Object.assign(new IndiceIGPDI(), jsonData);
    }
}