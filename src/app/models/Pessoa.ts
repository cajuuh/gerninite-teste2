import { Tecnologia } from './Tecnologia';
import { Projeto } from './Projeto';
export class Pessoa {

    constructor(
        public id: number,
        public operacao_id: number,
        public nome: string,
        public email: string,
        public nivel_id: string,
        public custo: Float32Array | null,

        // timestamps!
        public readonly created_at: Date,
        public readonly updated_at: Date,
    ) { }
}
