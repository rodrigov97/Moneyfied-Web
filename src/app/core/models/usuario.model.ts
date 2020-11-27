interface UsuarioAttributes {
  UsuarioId: number;
  Nome: string;
  Email: string;
  Senha: string;
  ImagemPerfil: string;
  EmailConfirmado: boolean;
}

export class Usuario implements UsuarioAttributes {
  UsuarioId: number;
  Nome: string;
  Email: string;
  Senha: string;
  ImagemPerfil: string;
  EmailConfirmado: boolean;

  constructor(attr: UsuarioAttributes) {
    this.UsuarioId = attr.UsuarioId;
    this.Nome = attr.Nome;
    this.Email = attr.Email;
    this.Senha = attr.Senha;
    this.ImagemPerfil = attr.ImagemPerfil;
    this.EmailConfirmado = attr.EmailConfirmado;
  }
}
