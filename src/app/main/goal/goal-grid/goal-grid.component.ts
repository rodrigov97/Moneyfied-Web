import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import { Despesa } from 'src/app/core/models/despesa.model';
import { Objetivo } from 'src/app/core/models/objetivo.model';
import { DataService } from 'src/app/shared/data.service';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-goal-grid',
  templateUrl: './goal-grid.component.html',
  styleUrls: ['./goal-grid.component.scss']
})
export class GoalGridComponent implements OnInit {

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
    private dataChanged: ChangeDetectorRef,
    private goalService: GoalService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  ngAfterViewInit(): void {
    this.dataChanged.detectChanges();
  }

  setPageData(pageNumber: any): void {
    this.currentPage = pageNumber.page;
    this.goalService.gridCurrentPage = this.currentPage;
    this.goalService.gridPageChange(pageNumber.page);
  }

  dblClickItem(event: any): void {
    if (event.type === 'dblclick') {

      if (event.row.Status === 'Alcancado') {
        this.dataService.openWarningDialogModal({
          command: 'open',
          title: 'Atenção',
          content: 'Esse objetivo já foi alcançado !'
        });
      }
      else {
        this.goalService.openFormGoal({
          command: 'open',
          formType: 'Alterar',
          data: event.row
        });
      }
    }
    if (event.type === 'click') {
      this.goalService.selectedItem = new Objetivo(event.row);
    }
  }
}
