export class TipoNegociacao {

    constructor(
        public id: number,
        public nome: string,
        public acao: string,

        public updatedAt: string,
        public createdAt: string,
    ) { }
}
