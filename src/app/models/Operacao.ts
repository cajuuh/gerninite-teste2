export class Operacao {

  constructor(
    public id: number,
    public nome: string | null,

    // timestamps!
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) { }
}
