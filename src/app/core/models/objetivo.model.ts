interface ObjetivoAttributes {
  ObjetivoId: number;
  UsuarioId: number;
  Nome: string;
  ValorObjetivo: number;
  ValorAtual: number;
  DataLimite: string;
  DataObjetivo: string;
  Atingido: boolean;
  Porcentagem?: string;
}


export class Objetivo implements ObjetivoAttributes {
  ObjetivoId: number;
  UsuarioId: number;
  Nome: string;
  ValorObjetivo: number;
  ValorAtual: number;
  DataLimite: string;
  DataObjetivo: string;
  Atingido: boolean;
  Porcentagem?: string;

  constructor(attr: ObjetivoAttributes) {
      this.ObjetivoId = attr.ObjetivoId;
      this.UsuarioId = attr.UsuarioId;
      this.Nome = attr.Nome;
      this.ValorObjetivo = attr.ValorObjetivo;
      this.ValorAtual = attr.ValorAtual;
      this.DataLimite = attr.DataLimite;
      this.DataObjetivo = attr.DataObjetivo;
      this.Atingido = attr.Atingido;
      this.Porcentagem = attr.Porcentagem;
  }
}
