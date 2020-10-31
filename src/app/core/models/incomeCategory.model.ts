interface IncomeCategoryAttributes {
  CategoriaReceitaId: number;
  UsuarioId: number;
  Nome: string;
}

export class CategoriaReceita implements IncomeCategoryAttributes {
  CategoriaReceitaId: number;
  UsuarioId: number;
  Nome: string;

  constructor(attr: IncomeCategoryAttributes) {
    this.CategoriaReceitaId = attr.CategoriaReceitaId;
    this.UsuarioId = attr.UsuarioId;
    this.Nome = attr.Nome;
  }
}
