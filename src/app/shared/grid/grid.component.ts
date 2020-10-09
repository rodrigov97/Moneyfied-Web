import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  a = [
    { id: '1' , nome: 'Rodrigo' },
    { id: '2' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '3' , nome: 'Rodrigo' },
    { id: '4' , nome: 'Rodrigo' }
  ];

  b = [{ id: 'Id' }, { nome: 'Nome' }];

  @Input() rows = [] = this.a;
  @Input() columns = [] = this.b;

  constructor() { }

  ngOnInit(): void {

  }

}
