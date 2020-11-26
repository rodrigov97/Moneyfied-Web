interface MenuItemAttributes {
  Icon: string;
  Name: string;
  Tooltip: string;
  Url: string;
  Color: string;
}

export class MenuItem implements MenuItemAttributes {
  Icon: string;
  Name: string;
  Tooltip: string;
  Url: string;
  Color: string;

  constructor(attr: MenuItemAttributes) {
    this.Icon = attr.Icon;
    this.Name = attr.Name;
    this.Tooltip = attr.Tooltip;
    this.Url = attr.Url;
    this.Color = attr.Color;
  }
}

export const MENUITEMS: MenuItem[] = [{
  Icon: 'fas fa-tachometer-alt',
  Name: 'Dashboard',
  Tooltip: 'Painel principal',
  Url: 'dashboard',
  Color: '#0277bd'
}, {
  Icon: 'fas fa-plus-circle',
  Name: 'Renda',
  Tooltip: 'Suas rendas',
  Url: 'incomes',
  Color: '#13ca66'
}, {
  Icon: 'fas fa-minus-circle',
  Name: 'Despesas',
  Tooltip: 'Suas despesas',
  Url: 'expenses',
  Color: '#e71426'
}, {
  Icon: 'fas fa-bullseye',
  Name: 'Metas',
  Tooltip: 'Seus Objetivos',
  Url: 'goals',
  Color: '#3949ab'
}, {
  Icon: 'far fa-user',
  Name: 'Meu Perfil',
  Tooltip: 'Dados do usuário',
  Url: 'my-profile',
  Color: '#102027'
}, {
  Icon: 'fas fa-sign-out-alt',
  Name: 'Sair',
  Tooltip: 'Sair da sessão atual',
  Url: '',
  Color: ''
}]
