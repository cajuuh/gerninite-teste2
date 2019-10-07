import { Pessoa } from './Pessoa';
import { Tecnologia } from './Tecnologia';

export class PessoaTecnologia {

  constructor(
    public id: number,
    public nivel_id: number,
    public pessoa: Pessoa,
    public tecnologia: Tecnologia,

    // timestamps!
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) { }
}
