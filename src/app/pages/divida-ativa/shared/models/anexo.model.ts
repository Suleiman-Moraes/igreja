import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Anexo extends BaseResourceModel{
    constructor(
        public caminhoAnexo?: string,
        public nomeAnexo?: string,
        public anexadoEm?: Date,
        public idRegistro?: number,
        public bytes?: string
    ){
        super();
    }

    static fromJson(jsonData: any): Anexo{
        return Object.assign(new Anexo(), jsonData);
    }
}