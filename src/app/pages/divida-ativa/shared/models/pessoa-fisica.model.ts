import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Telefone } from './telefone.model';
import { Email } from './email.model';
import { Uf } from './uf.model';
import { Cei } from './cei.model';
import { RegistroAgr } from './registro-agr.model';
import { Servico } from './servico.model';
import { Atividade } from './atividade.model';
import { Endereco } from './cadastrounico/endereco.model';
import { Representante } from './representante.model';

export class PessoaFisica extends BaseResourceModel{
    constructor(
        public nome?: string,
        public cpf?: string,
        public rg?: string,
        public orgaoExpedidor?: string,
        public nacionalidade?: string,
        public pendencia?: string,
        public observacao?: string,
        public situacaoPessoaEnum?: string,
        public uf?: Uf,
        public dataInclusao?: Date,
        public dataAlteracao?: Date,
        public dataUltimaAtivacao?: Date,
        public cei?: Cei[],
        public registroAgr?: RegistroAgr[],
        public servicos?: Servico[],
        public atividades?: Atividade[],
        public telefones?: Telefone[],
        public enderecos?: Endereco[],
        public emails?: Email[],
        public representantes?: Representante[]
    ){
        super();
    }

    get nomeOrRazaoSocial(): string{
        return this.nome;
    }

    static orgaoExpedidor = {
        SSP: 'SSP',
        SPTC: 'SPTC',
        DGPC: 'DGPC',
        OUTROS: 'Outros'
    }

    static fromJson(jsonData: any): PessoaFisica{
        return Object.assign(new PessoaFisica(), jsonData);
    }
}