import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comparison-chart',
  templateUrl: './comparison-chart.component.html',
  styleUrls: ['./comparison-chart.component.scss']
})
export class ComparisonChartComponent implements OnInit {

  @Input() isLoading: boolean = false;
  @Input() chartHeight: number = 0;
  @Input() chartType: string= '';
  @Input() chartData: any [] = [];
  @Input() info: any;

  multi: any = multi;

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  autoScale = true;
  xAxisLabel: string = 'Meses';
  yAxisLabel: string = 'Quantia (R$)';

  colorScheme: any = {
    domain: ['#4caf50', '#e71426', '#AAAAAA']
  };

  constructor() { }

  ngOnInit(): void {

  }
}

export var multi = [
  {
    "name": "Receitas",
    "series": [
      {
        "name": "Janeiro",
        "value": 890.30
      },
      {
        "name": "Fevereiro",
        "value": 600.04
      },
      {
        "name": "Março",
        "value": 900.90
      },
      {
        "name": "Abril",
        "value": 1000.00
      },
      {
        "name": "Maio",
        "value": 890.30
      },
      {
        "name": "Junho",
        "value": 600.04
      },
      {
        "name": "Julho",
        "value": 900.90
      },
      {
        "name": "Agosto",
        "value": 1000.00
      },
      {
        "name": "Setembro",
        "value": 890.30
      },
      {
        "name": "Outubro",
        "value": 600.04
      },
      {
        "name": "Novembro",
        "value": 900.90
      },
      {
        "name": "Dezembro",
        "value": 1000.00
      }
    ]
  },

  {
    "name": "Despesas",
    "series": [
      {
        "name": "Janeiro",
        "value": 200.58
      },
      {
        "name": "Fevereiro",
        "value": 358.99
      },
      {
        "name": "Março",
        "value": 100.50
      },
      {
        "name": "Abril",
        "value": 879.00
      },
      {
        "name": "Maio",
        "value": 200.58
      },
      {
        "name": "Junho",
        "value": 358.99
      },
      {
        "name": "Julho",
        "value": 100.50
      },
      {
        "name": "Agosto",
        "value": 879.00
      },
      {
        "name": "Setembro",
        "value": 200.58
      },
      {
        "name": "Outubro",
        "value": 358.99
      },
      {
        "name": "Novembro",
        "value": 100.50
      },
      {
        "name": "Dezembro",
        "value": 879.00
      }
    ]
  }
];
