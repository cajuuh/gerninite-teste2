// import { Fabrica } from './Fabrica';
export class Projeto {

    constructor(
        public id: number,
        public nome: string,
        public descricao: string,
        public valor: string,
        public cliente_id: number,

        // timestamps!
        public readonly created_at: Date,
        public readonly updated_at: Date,
    ) { }
}
