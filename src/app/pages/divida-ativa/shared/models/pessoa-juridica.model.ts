import { Email } from './email.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Telefone } from './telefone.model';
import { RegistroAgr } from './registro-agr.model';
import { Servico } from './servico.model';
import { Atividade } from './atividade.model';
import { Endereco } from './cadastrounico/endereco.model';
import { Representante } from './representante.model';

export class PessoaJuridica extends BaseResourceModel{
    constructor(
        public cnpj?: string,
        public razaoSocial?: string,
        public nomeFantasia?: string,
        public inscricaoEstadual?: string,
        public pendencia?: string,
        public observacao?: string,
        public situacaoPessoaEnum?: string,
        public dataInclusao?: Date,
        public dataAlteracao?: Date,
        public dataUltimaAtivacao?: Date,
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
        return this.razaoSocial;
    }

    static types = {
        ATIVO: 'Ativo',
        INATIVO: 'Inativo',
        VALIDACAO: 'Validação',
        BLOQUEADO: 'Bloqueado',
        EM_ANDAMENTO_DE_BAIXA: 'Em Andamento de Baixa',
        BAIXADO: 'Baixado'
    };

    static fromJson(jsonData: any): PessoaJuridica{
        return Object.assign(new PessoaJuridica(), jsonData);
    }
}