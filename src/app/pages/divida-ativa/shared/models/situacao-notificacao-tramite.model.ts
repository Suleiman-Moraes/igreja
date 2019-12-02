import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class SituacaoNotificacaoTramite extends BaseResourceModel{
    constructor(
        public descricao?: string,
        public situacao?: string,
        public visivelUsuarioExterno?: boolean
    ){
        super();
    }

    static fromJson(jsonData: any): SituacaoNotificacaoTramite{
        return Object.assign(new SituacaoNotificacaoTramite(), jsonData);
    }
}