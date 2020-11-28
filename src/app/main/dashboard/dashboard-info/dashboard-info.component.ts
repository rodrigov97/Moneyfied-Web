import { Component, Input, OnInit } from '@angular/core';
import { DespesaResumo } from 'src/app/core/models/despesa.model';

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
      MaxDesc: '-',
      MaxValue: '0',
      MinDesc: '-',
      MinValue: '0',
      TotalValue: '0',
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
