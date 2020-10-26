import { Injectable } from '@angular/core';

export interface DateAttributes {
  value: string;
  number?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  get months(): DateAttributes[] {
    return [{
      value: 'Janeiro',
      number: 1
    }, {
      value: 'Fevereiro',
      number: 2
    }, {
      value: 'Março',
      number: 3
    }, {
      value: 'Abril',
      number: 4
    }, {
      value: 'Maio',
      number: 5
    }, {
      value: 'Junho',
      number: 6
    }, {
      value: 'Julho',
      number: 7
    }, {
      value: 'Agosto',
      number: 8
    }, {
      value: 'Setembro',
      number: 9
    }, {
      value: 'Outubro',
      number: 10
    }, {
      value: 'Novembro',
      number: 11
    }, {
      value: 'Dezembro',
      number: 12
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

  ISOdateFormat(date: Date): string {
    var date = new Date(date);
    return date.toISOString().replace('T', ' ').replace('Z', ' ').slice(0, 19)
  }

  buildDateObj(date: string): string {
    if (typeof date === 'object') {
      return this.ISOdateFormat(date);
    }
    else {
      var dateParts = date.split("/"),
        year = parseInt(dateParts[2]),
        month = parseInt(dateParts[1]) - 1,
        day = parseInt(dateParts[0]);

      return this.ISOdateFormat(new Date(year, month, day));
    }
  }

  getMonthNumber(name: string): number {
    var month = this.months.find(month => month.value === name);
    return month.number;
  }

  get currentMonth(): number {
    var date = new Date();
    return date.getMonth() + 1;
  }

  get currentYear(): number {
    var date = new Date();
    return date.getFullYear();
  }
}
