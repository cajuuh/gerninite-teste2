import { Pessoa } from './Pessoa';
import { Tecnologia } from './Tecnologia';

export class PessoaTecnologiaCertificado {

  constructor(
    public id: number,
    public nome: string | null,
    public arquivo: Blob | null,
    public certificado_id: number | null,
    public pessoa_certificado_id: number | null,

    // timestamps!
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) { }
}
