import { Injectable } from '@angular/core';

export interface DateAttributes {
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  get months(): DateAttributes[] {
    return [{
      value: 'Janeiro'
    }, {
      value: 'Fevereiro'
    }, {
      value: 'Março'
    }, {
      value: 'Abril'
    }, {
      value: 'Maio'
    }, {
      value: 'Junho'
    }, {
      value: 'Julho'
    }, {
      value: 'Agosto'
    }, {
      value: 'Setembro'
    }, {
      value: 'Outubro'
    }, {
      value: 'Novembro'
    }, {
      value: 'Dezembro'
    }]
  }

  get years(): any {
    const date = new Date(),
      year = date.getFullYear();

    return [{
      value: year - 3
    }, {
      value: year - 2
    }, {
      value: year - 1
    }, {
      value: year
    }, {
      value: year + 1
    }, {
      value: year + 2
    }, {
      value: year + 3
    }]
  }
}
