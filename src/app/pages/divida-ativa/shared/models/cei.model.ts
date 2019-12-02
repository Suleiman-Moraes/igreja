import { PessoaFisica } from './pessoa-fisica.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Cei extends BaseResourceModel{
    constructor(
        public matricula?: string
    ){
        super();
    }

    static fromJson(jsonData: any): Cei{
        return Object.assign(new Cei(), jsonData);
    }
}