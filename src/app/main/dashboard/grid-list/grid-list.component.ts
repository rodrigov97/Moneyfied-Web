import { Component, Input, OnInit } from '@angular/core';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {

  @Input() type: string = '';
  @Input() rows = [];
  @Input() columns = [];
  @Input() rowCount: number;
  @Input() limit: number;
  @Input() loadingIndicator: boolean = false;

  currentPage: number = 1;
  selectionType: SelectionType;
  selected: [] = [];
  columnMode = ColumnMode;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
  }

  setPageData(pageNumber: any): void {
    this.currentPage = pageNumber.page;
    this.dashboardService.gridCurrentPage = this.currentPage;
    this.dashboardService.gridPageChange(pageNumber.page);
  }

  dblClickItem(event: any): void {
    // if (event.type === 'dblclick') {
    //   this.expenseService.openFormExpense({
    //     command: 'open',
    //     title: 'Atenção',
    //     form: 'Receita',
    //     formType: 'Alterar',
    //     data: event.row
    //   });
    //   this.expenseService.selectedItem = new Despesa(event.row);
    // }
    // if (event.type === 'click') {
    //   this.expenseService.selectedItem = new Despesa(event.row);
    // }
  }
}
