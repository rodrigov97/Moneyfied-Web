interface UsuarioAttributes {
  UsuarioId: number;
  Nome: string;
  Email: string;
  Senha: string;
  ImagemPerfil: string;
}

export class Usuario implements UsuarioAttributes {
  UsuarioId: number;
  Nome: string;
  Email: string;
  Senha: string;
  ImagemPerfil: string;

  constructor(attr: UsuarioAttributes) {
    this.UsuarioId = attr.UsuarioId;
    this.Nome = attr.Nome;
    this.Email = attr.Email;
    this.Senha = attr.Senha;
    this.ImagemPerfil = attr.ImagemPerfil;
  }
}
