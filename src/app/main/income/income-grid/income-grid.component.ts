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
  @Input() loadingIndicator: boolean = false;

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

  setPageData(info: any): void {

  }

  selectedRow(event: any): void {

  }

  dblClickItem(event: any): void {
    if (event.type === 'dblclick') {
      this.incomeService.openFormRegisterModal({
        command: 'open',
        title: 'Atenção',
        form: 'Receita',
        formType: 'Alterar',
        data: event
      });
    }

  }

}
