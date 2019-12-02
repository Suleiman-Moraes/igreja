import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Modulo extends BaseResourceModel{
    constructor(
        public nome?: string,
        public descricao?: string
    ){
        super();
    }

    static fromJson(jsonData: any): Modulo{
        return Object.assign(new Modulo(), jsonData);
    }
}