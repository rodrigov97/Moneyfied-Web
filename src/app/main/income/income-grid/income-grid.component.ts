import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Receita } from 'src/app/core/models/income.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-income-grid',
  templateUrl: './income-grid.component.html',
  styleUrls: ['./income-grid.component.scss']
})
export class IncomeGridComponent implements OnInit, AfterViewInit {

  @Input() rows = [];
  @Input() columns = [];

  selectionType: SelectionType;
  selected: [] = [];

  constructor(
    private dataService: DataService,
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
      this.dataService.openFormRegisterModal({
        command: 'open',
        title: 'Atenção',
        form: 'Receita',
        formType: 'Alterar',
        data: event
      });
    }

  }

}
