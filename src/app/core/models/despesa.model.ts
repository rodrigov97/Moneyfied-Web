interface DespesaAttributes {
  DespesaId: number;
  UsuarioId: number;
  CategoriaDespesaId: number;
  Descricao: string;
  Valor: number;
  Parcelado: boolean;
  ParcelaQtd: number;
  ParcelaValor: number;
  DataInicial: string;
  DataFinal: string;
  DataPagamento: string;
}

export interface DespesaResumo {
  MaxDesc: string;
  MaxValue: string;
  MinDesc: string;
  MinValue: string;
  TotalValue: string;
}

export class Despesa implements DespesaAttributes {
  DespesaId: number;
  UsuarioId: number;
  CategoriaDespesaId: number;
  Descricao: string;
  Valor: number;
  Parcelado: boolean;
  ParcelaQtd: number;
  ParcelaValor: number;
  DataInicial: string;
  DataFinal: string;
  DataPagamento: string;

  constructor(attr: DespesaAttributes) {
    this.DespesaId = attr.DespesaId;
    this.UsuarioId = attr.UsuarioId;
    this.CategoriaDespesaId = attr.CategoriaDespesaId;
    this.Descricao = attr.Descricao;
    this.Valor = attr.Valor;
    this.Parcelado = attr.Parcelado;
    this.ParcelaQtd = attr.ParcelaQtd;
    this.ParcelaValor = attr.ParcelaValor;
    this.DataInicial = attr.DataInicial;
    this.DataFinal = attr.DataFinal;
    this.DataPagamento = attr.DataPagamento;
  }
}
