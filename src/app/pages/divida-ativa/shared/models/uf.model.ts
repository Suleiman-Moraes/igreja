import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Pais } from './pais.model';

export class Uf extends BaseResourceModel{
    constructor(
        public nome?: string,
        public pais?: Pais
    ){
        super();
    }

    static ufValue = {
        AC: 'AC',
        AL: 'AL',
        AP: 'AP',
        AM: 'AM',
        BA: 'BA',
        CE: 'CE',
        DF: 'DF',
        ES: 'ES',
        GO: 'GO',
        MA: 'MA',
        MT: 'MT',
        MS: 'MS',
        MG: 'MG',
        PA: 'PA',
        PB: 'PB',
        PR: 'PR',
        PE: 'PE',
        PI: 'PI',
        RJ: 'RJ',
        RN: 'RN',
        RS: 'RS',
        RO: 'RO',
        RR: 'RR',
        SC: 'SC',
        SP: 'SP',
        SE: 'SE',
        TO: 'TO'
    };

    static fromJson(jsonData: any): Uf{
        return Object.assign(new Uf(), jsonData);
    }
}