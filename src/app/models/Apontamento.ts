export class Apontamento {

  constructor(
    public id: number,
    public hora_qnt: number | null,
    public valor_hora: Float32Array | null,
    public tipo_apontamento_id: Float32Array | null,
    public data: Date,
    public preco: number,
    public custo: number,
    public alocacao_id: number,

    // timestamps!
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) { }
}
