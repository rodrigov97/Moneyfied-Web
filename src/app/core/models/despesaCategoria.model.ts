interface ExpenseCategoryAttributes {
  CategoriaDespesaId: number;
  UsuarioId: number;
  Nome: string;
}

export class CategoriaDespesa implements ExpenseCategoryAttributes {
  CategoriaDespesaId: number;
  UsuarioId: number;
  Nome: string;

  constructor(attr: ExpenseCategoryAttributes) {
    this.CategoriaDespesaId = attr.CategoriaDespesaId;
    this.UsuarioId = attr.UsuarioId;
    this.Nome = attr.Nome;
  }
}
