import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberHandlerService {

  constructor() { }

  formatValue(valor: string): number {
    if (valor.includes(',')) {
      return Number(valor.replace(',', '.'));
    }
    else {
      const value = `${valor}.00`;
      return Number(value.replace(',', '.'));
    }
  }
}
