interface UsuarioAttributes {
  UsuarioId: number;
  Nome: string;
  Email: string;
  Senha: string;
  Plano: number;
}

export class Usuario implements UsuarioAttributes {
  UsuarioId: number;
  Nome: string;
  Email: string;
  Senha: string;
  Plano: number;

  constructor(attr: UsuarioAttributes) {
    this.UsuarioId = attr.UsuarioId;
    this.Nome = attr.Nome;
    this.Email = attr.Email;
    this.Senha = attr.Senha;
    this.Plano = attr.Plano;
  }
}
