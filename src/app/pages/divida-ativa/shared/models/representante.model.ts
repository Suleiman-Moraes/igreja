import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { PessoaJuridica } from './pessoa-juridica.model';
import { PessoaFisica } from './pessoa-fisica.model';

export class Representante extends BaseResourceModel{
    constructor(
        public dataEntrada?: Date,
        public participacao?: number,
        public cotaIndividual?: number,
        public cotaTotal?: number,
        public tipoRepresentanteLegal?: string,
        public pessoaJuridicaRepresentante?: PessoaJuridica,
        public pessoaFisicaRepresentante?: PessoaFisica
    ){
        super();
    }

    get representante(): PessoaFisica | PessoaJuridica{
        return this.pessoaFisicaRepresentante != null ? this.pessoaFisicaRepresentante : this.pessoaJuridicaRepresentante;
    }

    get representanteName(): string{
        return this.representante.nomeOrRazaoSocial;
    }

    static tipoRepresentanteLegalEnum = {
        Sócio: 'Sócio', 
        Cooperado: 'Cooperado', 
        'Sócio Diretor': 'Sócio Diretor', 
        Diretor: 'Diretor', 
        Outros: 'Outros'
    };

    static tipoRepresentanteLegalEnumValue = {
        SOCIO: 'SOCIO', 
        COOPERADO: 'COOPERADO', 
        SOCIO_DIRETOR: 'SOCIO_DIRETOR', 
        DIRETOR: 'DIRETOR', 
        OUTROS: 'OUTROS'
    };

    static fromJson(jsonData: any): Representante{
        return Object.assign(new Representante(), jsonData);
    }
}