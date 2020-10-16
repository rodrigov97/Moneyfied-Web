interface ReceitaAttributes {
  ReceitaId: number;
  UsuarioId: number;
  Descricao: string;
  Valor: number;
  DataRecebimento: string;
}

export class Receita implements ReceitaAttributes {
  ReceitaId: number;
  UsuarioId: number;
  Descricao: string;
  Valor: number;
  DataRecebimento: string;

  constructor(attr: ReceitaAttributes) {
    this.ReceitaId = attr.ReceitaId;
    this.UsuarioId = attr.UsuarioId;
    this.Descricao = attr.Descricao;
    this.Valor = attr.Valor;
    this.DataRecebimento = attr.DataRecebimento;
  }
}
