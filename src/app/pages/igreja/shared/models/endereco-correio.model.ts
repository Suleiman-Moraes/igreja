export class EnderecoCorreio{
    constructor(
        public cep?: string,
        public logradouro?: string,
        public bairro?: string,
        public localidade?: string,
        public uf?: string
    ){}

    static fromJson(jsonData: any): EnderecoCorreio{
        return Object.assign(new EnderecoCorreio(), jsonData);
    }
}