import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { Despesa } from 'src/app/core/models/despesa.model';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-grid',
  templateUrl: './expense-grid.component.html',
  styleUrls: ['./expense-grid.component.scss']
})
export class ExpenseGridComponent implements OnInit {

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
    private expenseService: ExpenseService,
    private dataChanged: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  ngAfterViewInit(): void {
    this.dataChanged.detectChanges();
  }

  setPageData(pageNumber: any): void {
    this.currentPage = pageNumber.page;
    this.expenseService.gridCurrentPage = this.currentPage;
    this.expenseService.gridPageChange(pageNumber.page);
  }

  dblClickItem(event: any): void {
    if (event.type === 'dblclick') {
      this.expenseService.openFormExpense({
        command: 'open',
        title: 'Atenção',
        form: 'Receita',
        formType: 'Alterar',
        data: event.row
      });
    }
    if (event.type === 'click') {
      this.expenseService.selectedItem = new Despesa(event.row);
    }
  }
}
