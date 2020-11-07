import { Component, Input, OnInit } from '@angular/core';
import { DespesaResumo } from 'src/app/core/models/despesa.model';

@Component({
  selector: 'app-expense-info',
  templateUrl: './expense-info.component.html',
  styleUrls: ['./expense-info.component.scss']
})
export class ExpenseInfoComponent implements OnInit {

  @Input() isMobile: boolean = false;
  @Input() resume: DespesaResumo;
  constructor() { }

  ngOnInit(): void {
    this.setResumeDeafultValue();
  }

  setResumeDeafultValue(): void {
    this.resume = {
      MaxDesc: '-',
      MaxValue: '0',
      MinDesc: '-',
      MinValue: '0',
      TotalValue: '0',
    };
  }

  expenseStatus(value: string): {} {
    var amount = parseFloat(value);
    if (amount < 0) {
      return {
        'color': '#e71426'
      }
    }
    else if (amount > 0) {
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
    else if (amount > 0) {
      return false;
    }
  }

  biggerThanZero(value: string): boolean {
    var amount = parseFloat(value);
    if (amount > 0) {
      return true;
    }
    else if (amount > 0) {
      return false;
    }
  }
}
