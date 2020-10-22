import { Component, Input, OnInit } from '@angular/core';
import { ReceitaResumo } from 'src/app/core/models/income.model';

@Component({
  selector: 'app-income-info',
  templateUrl: './income-info.component.html',
  styleUrls: ['./income-info.component.scss']
})
export class IncomeInfoComponent implements OnInit {

  @Input() isMobile: boolean = false;
  @Input() resume: ReceitaResumo;
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

  incomeStatus(value: string): {} {
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
