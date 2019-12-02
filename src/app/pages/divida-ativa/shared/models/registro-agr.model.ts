import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class RegistroAgr extends BaseResourceModel{
    constructor(
        public registro?: number
    ){
        super();
    }

    static fromJson(jsonData: any): RegistroAgr{
        return Object.assign(new RegistroAgr(), jsonData);
    }
    
}