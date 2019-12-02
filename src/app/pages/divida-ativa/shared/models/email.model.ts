import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Email extends BaseResourceModel{
    constructor(
        public email?: string,
        public observacao?: string,
        public principal?: boolean
    ){
        super();
    }

    static fromJson(jsonData: any): Email{
        return Object.assign(new Email(), jsonData);
    }
}