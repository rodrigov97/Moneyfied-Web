interface IncomeCategoryAttributes {
  CategoriaReceitaId: number;
  Nome: string;
}

export class CategoriaReceita implements IncomeCategoryAttributes {
  CategoriaReceitaId: number;
  Nome: string;

  constructor(attr: IncomeCategoryAttributes) {
    this.CategoriaReceitaId = attr.CategoriaReceitaId;
    this.Nome = attr.Nome;
  }
}
