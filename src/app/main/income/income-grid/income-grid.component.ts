import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-income-grid',
  templateUrl: './income-grid.component.html',
  styleUrls: ['./income-grid.component.scss']
})
export class IncomeGridComponent implements OnInit, AfterViewInit {

  @Input() rows = [];
  @Input() columns = [];
  @Input() rowCount: number;
  @Input() limit: number;
  @Input() loadingIndicator: boolean = false;

  currentPage: number = 1;
  selectionType: SelectionType;
  selected: [] = [];

  constructor(
    private incomeService: IncomeService,
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
    this.incomeService.gridCurrentPage = this.currentPage;
    this.incomeService.gridPageChange(pageNumber.page);
  }

  dblClickItem(event: any): void {
    if (event.type === 'dblclick') {
      this.incomeService.openFormRegisterModal({
        command: 'open',
        title: 'Atenção',
        form: 'Receita',
        formType: 'Alterar',
        data: event.row
      });
    }
  }
}
