import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.scss']
})
export class DashboardInfoComponent implements OnInit {

  @Input() isMobile: boolean = false;
  @Input() resume: any;

  constructor() { }

  ngOnInit(): void {
    this.setResumeDeafultValue();
  }

  setResumeDeafultValue(): void {
    this.resume = {
      ReceitaValue: '0',
      DespesaValue: '0',
      Saldo: '0',
    };
  }

  expenseStatus(value: string): {} {
    var amount = parseFloat(value);

    if (amount) {

      return {
        'color': '#e71426'
      }
    }
  }

  incomeStatus(value: string): {} {
    var amount = parseFloat(value);

    if (amount) {

      return {
        'color': '#13ca66'
      }
    }
  }

  totalStatus(value: string): {} {
    var amount = parseFloat(value);

    if (amount) {

      return {
        'color': '#13ca66'
      }
    }
  }

  lowerThanZero(value: string): boolean {
    var amount = parseFloat(value);
    if (amount < 0) {
      return true;
    }
    else {
      return false;
    }
  }

  biggerThanZero(value: string): boolean {
    var amount = parseFloat(value);
    if (amount > 0) {
      return true;
    }
    else {
      return false;
    }
  }
}
