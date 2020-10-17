import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-income-info',
  templateUrl: './income-info.component.html',
  styleUrls: ['./income-info.component.scss']
})
export class IncomeInfoComponent implements OnInit {

  @Input() isMobile: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  incomeStatus(value: number): {} {
    if (value < 0) {
      return {
        'color': '#e71426'
      }
    }
    else if (value > 0) {
      return {
        'color': '#13ca66'
      }
    }
  }
}
