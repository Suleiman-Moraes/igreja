import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Email } from './email.model';

export class Unidade extends BaseResourceModel{
    constructor(
        public nome?: string,
        public sigla?: string,
        public situacao?: boolean,
        public email?: Email
    ){
        super();
    }

    static fromJson(jsonData: any): Unidade{
        return Object.assign(new Unidade(), jsonData);
    }
}