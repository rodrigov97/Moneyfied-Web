interface ReceitaAttributes {
  ReceitaId: number;
  UsuarioId: number;
  CategoriaReceitaId: number;
  Descricao: string;
  Valor: number;
  DataRecebimento: string;
}

export interface ReceitaResumo {
  MaxDesc: string;
  MaxValue: string;
  MinDesc: string;
  MinValue: string;
  TotalValue: string;
}

export class Receita implements ReceitaAttributes {
  ReceitaId: number;
  UsuarioId: number;
  CategoriaReceitaId: number;
  Descricao: string;
  Valor: number;
  DataRecebimento: string;

  constructor(attr: ReceitaAttributes) {
    this.ReceitaId = attr.ReceitaId;
    this.UsuarioId = attr.UsuarioId;
    this.CategoriaReceitaId = attr.CategoriaReceitaId;
    this.Descricao = attr.Descricao;
    this.Valor = attr.Valor;
    this.DataRecebimento = attr.DataRecebimento;
  }
}
