import { Component, Input, OnInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-income-grid',
  templateUrl: './income-grid.component.html',
  styleUrls: ['./income-grid.component.scss']
})
export class IncomeGridComponent implements OnInit {
  a = [
    { id: '1', nome: 'Rodrigo' },
    { id: '2', nome: 'Pedro' },
  ];

  b = [{ nome: 'Nome' }];

  @Input() rows = [] = this.a;
  @Input() columns = [] = this.b;


  selectionType: SelectionType;
  selected: [] = [];

  constructor() { }

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'));
  }


  setPageData(info: any): void {

  }

  selectedRow(event: any): void {

  }

  dblClickItem(event: any): void {
    if(event.type === 'dblclick') {

    }

  }

}
