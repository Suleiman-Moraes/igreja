import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class ItemChecklist extends BaseResourceModel{
    constructor(
        public descricao?: string,
        public situacao?: string,
        public dataCadastro?: Date
    ){
        super();
    }

    static fromJson(jsonData: any): ItemChecklist{
        return Object.assign(new ItemChecklist(), jsonData);
    }
}