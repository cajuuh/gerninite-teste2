export class Negociacao {

  constructor(
    public id: number,
    public nome: string | null,
    public tipo_negociacao_id: number,
    public projeto_id: number,

    // timestamps!
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) { }
}
