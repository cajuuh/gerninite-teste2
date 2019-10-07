export class Cliente {

  constructor(
    public id: number,
    public nome: string | null,
    public operacao_id: number,

    // timestamps!
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) { }
}
