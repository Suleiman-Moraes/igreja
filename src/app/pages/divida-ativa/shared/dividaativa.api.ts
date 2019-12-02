// const serverType: string = 'Teste';
// const serverType: string = 'Teste Local';
// const serverType: string = 'Teste Fora';
// const serverType: string = 'Homo Fora';
const serverType: string = 'LocalHost';
// const serverType: string = 'Produção';

const DIVIDAATIVA_LOCALHOST: string = 'http://localhost:7772'; //LocalHost
const DIVIDAATIVA_TESTELOCAL: string = 'http://10.243.4.187:8082/dividaativaservice'; //Teste Local
const DIVIDAATIVA_TESTE: string = 'http://10.243.1.27:8080/dividaativaservice'; //Teste
const DIVIDAATIVA_TESTE_FORA: string = 'http://187.6.249.66:8080/dividaativaservice'; //Teste Fora
const DIVIDAATIVA_HOMO_FORA: string = 'http://187.6.249.66:8088/dividaativaservice'; //Homo Fora
const DIVIDAATIVA_PRODUCAO: string = 'https://www.portal.agr.go.gov.br/dividaativaservice'; //Produção
const DIVIDAATIVA: string = serverType == 'Teste Local' ? DIVIDAATIVA_TESTELOCAL : (serverType == 'Teste' ? DIVIDAATIVA_TESTE : (serverType == 'LocalHost' ? DIVIDAATIVA_LOCALHOST : (serverType == 'Teste Fora' ? DIVIDAATIVA_TESTE_FORA : (serverType == 'Homo Fora' ? DIVIDAATIVA_HOMO_FORA : DIVIDAATIVA_PRODUCAO))));

//Caminho para o Front do Transporte não regular
const TRANSPORTE_NAO_REGULAR_LOCALHOST: string = 'http://localhost:9090'; //LocalHost
const TRANSPORTE_NAO_REGULAR_TESTE: string = 'http://10.243.1.27:8080'; //Teste
const TRANSPORTE_NAO_REGULAR_TESTE_FORA: string = 'http://187.6.249.66:8080'; //Teste Fora
const TRANSPORTE_NAO_REGULAR_HOMO_FORA: string = 'http://187.6.249.66:8088'; //Homo Fora
const TRANSPORTE_NAO_REGULAR_TESTELOCAL: string = 'http://10.243.4.187:8082'; //Teste Local
const TRANSPORTE_NAO_REGULAR_PRODUCAO: string = 'https://www.portal.agr.go.gov.br'; //Produção
const TRANSPORTE_NAO_REGULAR: string = serverType == 'Teste Local' ? TRANSPORTE_NAO_REGULAR_TESTELOCAL : (serverType == 'Teste' ? TRANSPORTE_NAO_REGULAR_TESTE : (serverType == 'LocalHost' ? TRANSPORTE_NAO_REGULAR_LOCALHOST : (serverType == 'Teste Fora' ? TRANSPORTE_NAO_REGULAR_TESTE_FORA : (serverType == 'Homo Fora' ? TRANSPORTE_NAO_REGULAR_HOMO_FORA : TRANSPORTE_NAO_REGULAR_PRODUCAO))));
const TRANSPORTE_NAO_REGULAR_MODULO: string = `${TRANSPORTE_NAO_REGULAR}/ModuloTransporte`;
export const TRANSPORTE_NAO_REGULAR_HOST = `${TRANSPORTE_NAO_REGULAR}/`;

const FISCALIZACAO_LOCALHOST: string = 'http://localhost:4202/#'; //LocalHost
const FISCALIZACAO_TESTELOCAL: string = 'http://10.243.4.187:8082/fiscalizacao/#'; //Teste Local
const FISCALIZACAO_TESTE: string = 'http://10.243.1.27:8080/fiscalizacao/#'; //Teste
const FISCALIZACAO_TESTE_FORA: string = 'http://187.6.249.66:8088/fiscalizacao/#'; //Teste Fora
const FISCALIZACAO_PRODUCAO: string = 'https://www.portal.agr.go.gov.br/fiscalizacao/#'; //Produção
const FISCALIZACAO: string = serverType == 'Teste Local' ? FISCALIZACAO_TESTELOCAL : (serverType == 'Teste' ? FISCALIZACAO_TESTE : (serverType == 'LocalHost' ? FISCALIZACAO_LOCALHOST : (serverType == 'Teste Fora' ? FISCALIZACAO_TESTE_FORA : FISCALIZACAO_PRODUCAO)));
export const FISCALIZACAO_HOST = `${FISCALIZACAO}/`;
export const FISCALIZACAO_LOGIN = `${FISCALIZACAO}/login`;

//Caminho para o Front do CADU
const CADU_PRODUCAO: string = 'https://www.portal.agr.go.gov.br/cadastrounico/#';
const CADU_TESTE: string = 'http://10.243.1.27:8080/cadastrounico/#'; //Teste
const CADU_HOMO_FORA: string = 'http://187.6.249.66:8088/cadastrounico/#'; //Homo Fora
const CADU_TESTE_FORA: string = 'http://187.6.249.66:8080/cadastrounico/#'; //Teste Fora
const CADU_TESTELOCAL: string = 'http://10.243.4.187:8082/cadastrounico/#' //Teste Local;
const CADU_LOCALHOST: string = 'http://localhost:4200/#'; //LocalHost
const CADU: string = serverType == 'Teste Local' ? CADU_TESTELOCAL : (serverType == 'Teste' ? CADU_TESTE : (serverType == 'LocalHost' ? CADU_LOCALHOST : (serverType == 'Teste Fora' ? CADU_TESTE_FORA : (serverType == 'Homo Fora' ? CADU_HOMO_FORA : CADU_PRODUCAO))));

const CADU_SERVICE_PRODUCAO: string = 'https://www.portal.agr.go.gov.br/cadastrounicoservice';
const CADU_SERVICE_TESTE: string = 'http://10.243.1.27:8080/cadastrounicoservice'; //Teste
const CADU_SERVICE_TESTE_FORA: string = 'http://187.6.249.66:8080/cadastrounicoservice'; //Teste Fora
const CADU_SERVICE_HOMO_FORA: string = 'http://187.6.249.66:8088/cadastrounicoservice'; //Homo Fora
const CADU_SERVICE_TESTELOCAL: string = 'http://10.243.4.187:8082/cadastrounicoservice' //Teste Local;
const CADU_SERVICE_LOCALHOST: string = 'http://localhost:8080'; //LocalHost
const CADU_SERVICE: string = serverType == 'Teste Local' ? CADU_SERVICE_TESTELOCAL : (serverType == 'Teste' ? CADU_SERVICE_TESTE : (serverType == 'LocalHost' ? CADU_SERVICE_LOCALHOST : (serverType == 'Teste Fora' ? CADU_SERVICE_TESTE_FORA : (serverType == 'Homo Fora' ? CADU_SERVICE_HOMO_FORA : CADU_SERVICE_PRODUCAO))));
const CADU_SERVICE_API: string = `${CADU_SERVICE}/api`;

export const CADU_SERVICE_API_ANEXO_DOWNLOAD: string = `${CADU_SERVICE_API}/anexo/download`;

export const DIVIDAATIVA_AUTH: string = `${DIVIDAATIVA}/auth`;
export const DIVIDAATIVA_API: string = `${DIVIDAATIVA}/api`;

export const FINDBYPARAMSSINGLE: string = '/findbyparamssingle';
export const FINDBYPARAMSRELATORIO: string = '/findbyparamsrelatorio';
export const DTO: string = '/dto';

//CadastroUnico
export const CADU_LOGIN: string = `${CADU}/login`;
export const CADU_CADASTROUNICO: string = `${CADU}/cadastrounico`;
export const CADU_CADASTROUNICO_VEICULO: string = `${CADU_CADASTROUNICO}/veiculo`;

//Licenca
export const DIVIDAATIVA_API_LICENCA: string = `${DIVIDAATIVA_API}/licenca`;

//Parametro
export const DIVIDAATIVA_API_PARAMETRO: string = `${DIVIDAATIVA_API}/parametro`;

//EdicaoRefis
export const DIVIDAATIVA_API_EDICAOREFIS: string = `${DIVIDAATIVA_API}/edicaorefis`;
export const DIVIDAATIVA_API_EDICAOREFIS_SITUACAO: string = `${DIVIDAATIVA_API_EDICAOREFIS}/situacao`;

//Debito
export const DIVIDAATIVA_API_DEBITO: string = `${DIVIDAATIVA_API}/debito`;
export const DIVIDAATIVA_API_DEBITO_FINDBYPARAMSFILTER: string = `${DIVIDAATIVA_API_DEBITO}/findbyparamsfilter`;
export const DIVIDAATIVA_API_DEBITO_FINDBYPARAMSFORDIVIDA: string = `${DIVIDAATIVA_API_DEBITO}/findbyparamsfordivida`;
export const DIVIDAATIVA_API_DEBITO_INSCRVERDIVIDA: string = `${DIVIDAATIVA_API_DEBITO}/inscrverdivida`;
export const DIVIDAATIVA_API_DEBITO_IMPRIMIR: string = `${DIVIDAATIVA_API_DEBITO}/imprimir`;
export const DIVIDAATIVA_API_DEBITO_IMPRIMIR_TRAMITE: string = `${DIVIDAATIVA_API_DEBITO}/imprimir/tramite`;
export const DIVIDAATIVA_API_DEBITO_ASSUMIRANALISE: string = `${DIVIDAATIVA_API_DEBITO}/assumiranalise`;
export const DIVIDAATIVA_API_DEBITO_CHECKLISTDTO: string = `${DIVIDAATIVA_API_DEBITO}/checklistdto`;
export const DIVIDAATIVA_API_DEBITO_DEBITONEGOCIACAOPIDTO: string = `${DIVIDAATIVA_API_DEBITO}/debitonegociacaopidto`;
export const DIVIDAATIVA_API_DEBITO_DTONEGOCIACAODETALHE: string = `${DIVIDAATIVA_API_DEBITO}/dtonegociacaodetalhe`;
export const DIVIDAATIVA_API_DEBITO_BAIXAR_TRAMITE: string = `${DIVIDAATIVA_API_DEBITO}/baixar/all`;

//Devedor
export const DIVIDAATIVA_API_DEVEDOR: string = `${DIVIDAATIVA_API}/devedor`;

//Dare
export const DIVIDAATIVA_API_DARE: string = `${DIVIDAATIVA_API}/dare`;
export const DIVIDAATIVA_API_DARE_EMITIRDARESBYDEBITOS: string = `${DIVIDAATIVA_API_DARE}/emitirdaresbydebitos`;
export const DIVIDAATIVA_API_DARE_ID: string = `${DIVIDAATIVA_API_DARE}/id`;

//Unidadecadu
export const DIVIDAATIVA_API_UNIDADECADU: string = `${DIVIDAATIVA_API}/unidadecadu`;
export const DIVIDAATIVA_API_UNIDADECADU_FINDNOMEID_ID: string = `${DIVIDAATIVA_API_UNIDADECADU}/findnomeid/id`;
export const DIVIDAATIVA_API_UNIDADECADU_FINDNOMEID_SITUACAO: string = `${DIVIDAATIVA_API_UNIDADECADU}/findnomeid/situacao`;
export const DIVIDAATIVA_API_UNIDADECADU_FINDNOMEID_SITUACAO_IDNOTIN: string = `${DIVIDAATIVA_API_UNIDADECADU}/findnomeid/situacao/idnotin`;

//Tramite
export const DIVIDAATIVA_API_TRAMITE: string = `${DIVIDAATIVA_API}/tramite`;
export const DIVIDAATIVA_API_TRAMITE_DEBITOTRAMITEDTO: string = `${DIVIDAATIVA_API_TRAMITE}/debitotramitedto`;
export const DIVIDAATIVA_API_TRAMITE_IMPRIMIR: string = `${DIVIDAATIVA_API_TRAMITE}/imprimir`;

//Prazo
export const DIVIDAATIVA_API_PRAZO: string = `${DIVIDAATIVA_API}/prazo`;

//Negociacao
export const DIVIDAATIVA_API_NEGOCIACAO: string = `${DIVIDAATIVA_API}/negociacao`;
export const DIVIDAATIVA_API_NEGOCIACAO_GERARSIMULACAOTAC: string = `${DIVIDAATIVA_API_NEGOCIACAO}/gerarsimulacaotac`;
export const DIVIDAATIVA_API_NEGOCIACAO_GERARSIMULACAOTAD: string = `${DIVIDAATIVA_API_NEGOCIACAO}/gerarsimulacaotad`;
export const DIVIDAATIVA_API_NEGOCIACAO_DEBITO: string = `${DIVIDAATIVA_API_NEGOCIACAO}/debito`;
export const DIVIDAATIVA_API_NEGOCIACAO_NAOEXTINTO: string = `${DIVIDAATIVA_API_NEGOCIACAO}/naoextinto`;
export const DIVIDAATIVA_API_NEGOCIACAO_GERARTAC: string = `${DIVIDAATIVA_API_NEGOCIACAO}/gerartac`;
export const DIVIDAATIVA_API_NEGOCIACAO_GERARTAD: string = `${DIVIDAATIVA_API_NEGOCIACAO}/gerartad`;
export const DIVIDAATIVA_API_NEGOCIACAO_NEXTPARCELA: string = `${DIVIDAATIVA_API_NEGOCIACAO}/nextparcela`;
export const DIVIDAATIVA_API_NEGOCIACAO_TERMO: string = `${DIVIDAATIVA_API_NEGOCIACAO}/termo`;
export const DIVIDAATIVA_API_NEGOCIACAO_IMPRIMIR: string = `${DIVIDAATIVA_API_NEGOCIACAO}/imprimir`;

//Registro
export const DIVIDAATIVA_API_REGISTRO: string = `${DIVIDAATIVA_API}/registro`;

//RegistroExterno
export const DIVIDAATIVA_API_REGISTROEXTERNO: string = `${DIVIDAATIVA_API}/registroexterno`;
export const DIVIDAATIVA_API_REGISTROEXTERNO_IMPRIMIR: string = `${DIVIDAATIVA_API_REGISTROEXTERNO}/imprimir`;

//Anexo
export const DIVIDAATIVA_API_ANEXO: string = `${DIVIDAATIVA_API}/anexo`;
export const DIVIDAATIVA_API_ANEXO_VER: string = `${DIVIDAATIVA_API_ANEXO}/ver`;

//ItemChecklist
export const DIVIDAATIVA_API_ITEMCHECKLIST: string = `${DIVIDAATIVA_API}/itemchecklist`;
export const DIVIDAATIVA_API_ITEMCHECKLIST_FINDBYPARAMSFILTER: string = `${DIVIDAATIVA_API_ITEMCHECKLIST}/findbyparamsfilter`;

//PessoaCadu
export const DIVIDAATIVA_API_PESSOACADU: string = `${DIVIDAATIVA_API}/pessoacadu`;
export const DIVIDAATIVA_API_PESSOACADU_CNPJCPFCEI: string = `${DIVIDAATIVA_API_PESSOACADU}/cnpjcpfcei`;
export const DIVIDAATIVA_API_PESSOACADU_CPFORCEIORCNPJNOFILTER: string = `${DIVIDAATIVA_API_PESSOACADU}/cpforceiorcnpjnofilter`;

//MensagemPadronizada
export const DIVIDAATIVA_API_MENSAGEM_PADRONIZADA: string = `${DIVIDAATIVA_API}/mensagempadronizada`;
export const DIVIDAATIVA_API_MENSAGEM_PADRONIZADA_SITUACAO: string = `${DIVIDAATIVA_API_MENSAGEM_PADRONIZADA}/situacao`;

//SituacaoNotificacaoTramite
export const DIVIDAATIVA_API_SITUACAO_NOTIFICACAO_TRAMITE: string = `${DIVIDAATIVA_API}/situacaonotificacaotramite`;
export const DIVIDAATIVA_API_SITUACAO_NOTIFICACAO_TRAMITE_SITUACAO: string = `${DIVIDAATIVA_API_SITUACAO_NOTIFICACAO_TRAMITE}/situacao`;

//TipoDebito
export const DIVIDAATIVA_API_TIPO_DEBITO: string = `${DIVIDAATIVA_API}/tipodebito`;
export const DIVIDAATIVA_API_TIPO_DEBITO_SITUACAO: string = `${DIVIDAATIVA_API_TIPO_DEBITO}/situacao`;

//TipoDebito
export const DIVIDAATIVA_API_INDICE_IGPDI: string = `${DIVIDAATIVA_API}/indiceigpdi`;
export const DIVIDAATIVA_API_INDICE_IGPDI_FINDBYPARAMSFILTER: string = `${DIVIDAATIVA_API_INDICE_IGPDI}/findbyparamsfilter`;
export const DIVIDAATIVA_API_INDICE_IGPDI_FINDLASTMULTIPLICADOR: string = `${DIVIDAATIVA_API_INDICE_IGPDI}/findlastmultiplicador`;
export const DIVIDAATIVA_API_INDICE_IGPDI_FINDLASTMESANO: string = `${DIVIDAATIVA_API_INDICE_IGPDI}/findlastmesano`;

//TipoDebito
export const DIVIDAATIVA_API_EXECUCAO_FISCAL: string = `${DIVIDAATIVA_API}/execucaofiscal`;
export const DIVIDAATIVA_API_FIND_IN_LIST: string = `${DIVIDAATIVA_API_EXECUCAO_FISCAL}/findinlist`;
export const DIVIDAATIVA_API_FIND_ID: string = `${DIVIDAATIVA_API_EXECUCAO_FISCAL}/findbyid`;
export const DIVIDAATIVA_API_FIND_BY_PARAMS: string = `${DIVIDAATIVA_API_EXECUCAO_FISCAL}/findbyparamspaginated`;

//AreaAtuacao
export const DIVIDAATIVA_API_AREA_ATUACAO: string = `${DIVIDAATIVA_API}/areaatuacao`;
export const DIVIDAATIVA_API_AREA_ATUACAO_SITUACAO: string = `${DIVIDAATIVA_API_AREA_ATUACAO}/situacao`;

//CodigoReceita
export const DIVIDAATIVA_API_CODIGO_RECEITA: string = `${DIVIDAATIVA_API}/codigoreceita`;

//Parcela
export const DIVIDAATIVA_API_PARCELA: string = `${DIVIDAATIVA_API}/parcela`;
export const DIVIDAATIVA_API_PARCELA_NEXT: string = `${DIVIDAATIVA_API_PARCELA}/next`;

//DataFeriado
export const DIVIDAATIVA_API_DATA_FERIADO: string = `${DIVIDAATIVA_API}/dataferiado`;

//Saldo Remnascesnte
export const DIVIDAATIVA_API_SALDO_REMANESCENTE: string = `${DIVIDAATIVA_API}/saldoremanescente`;

//DividaAtiva
export const DIVIDAATIVA_API_DIVIDA_ATIVA: string = `${DIVIDAATIVA_API}/dividaativa`;
export const DIVIDAATIVA_API_DIVIDA_ATIVA_FIND_DEBITO: string = `${DIVIDAATIVA_API_DIVIDA_ATIVA}/debitooo`;

//Anexo
export const DIVIDAATIVA_API_ANEXO_CADU: string = `${DIVIDAATIVA_API}/anexocadu`;
export const DIVIDAATIVA_API_ANEXO_CADU_FIND_BY_PESSOA: string = `${DIVIDAATIVA_API_ANEXO_CADU}/findbypessoa`;