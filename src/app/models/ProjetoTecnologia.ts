import { Projeto } from './Projeto';
import { Tecnologia } from './Tecnologia';
export class ProjetoTecnologia {

    constructor(
        public id: number,
        public projeto_id: number,
        public tecnologia_id: number,
        // public projeto: Projeto, // for nullable fields
        // public tecnologia: Tecnologia, // for nullable fields

        // timestamps!
        public readonly created_at: Date,
        public readonly updated_at: Date,
    ) { }
}
