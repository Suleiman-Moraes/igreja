import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Servico } from './servico.model';

export class Atividade extends BaseResourceModel{
    constructor(
        public nome?: string,
        public descricao?: string,
        public ativo?: Boolean,
        public servico?: Servico,
        public isSelected: boolean = false
    ){
        super();
    }

    static fromJson(jsonData: any): Atividade{
        return Object.assign(new Atividade(), jsonData);
    }
}