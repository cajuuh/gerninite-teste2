export class Alocacao {

  constructor(
    public id: number,
    public pessoa_id: number | null,
    public negociacao_id: number | null,
    public dt_final: Date,
    public dt_inicial: Date,
    public preco: number,
    public percentual_alocacao: number,

    // timestamps!
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) { }
}
