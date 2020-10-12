import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  a = [
    { id: '1', nome: 'Rodrigo' },
    { id: '2', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '3', nome: 'Rodrigo' },
    { id: '4', nome: 'Rodrigo' }
  ];

  b = [{ nome: 'Id' }, { nome: 'Nome' }];

  @Input() rows = [] = this.a;
  @Input() columns = [] = this.b;

  columnWidths = [
    {column: "Id", width: '100%'},
    {column: "Nome", width: '100%'}
  ]

  constructor() { }

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  onResize(): void {
    this.columns.forEach((col: any) => {
      const colWidth = this.columnWidths.find(colWidth => colWidth.column === col.prop);
      if (colWidth) {
        col.width = colWidth.width;
      }
    });
  }

  setPageData(info: any): void {

  }

}
