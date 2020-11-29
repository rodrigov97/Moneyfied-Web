import { ChangeDetectorRef } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { TokenErrorHandlerService } from 'src/app/core/services/token-error-handler.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isMobile: boolean = true;

  isLoading: boolean = false;

  @ViewChild('main') mainSection: ElementRef;
  @ViewChild('headerInfo') headerInfo: ElementRef;
  @ViewChild('dataContent') dataContent: ElementRef;

  @ViewChild('btnGroup') btnGroup: ElementRef;
  @ViewChild('listName') listName: ElementRef;
  @ViewChild('listContainer') listContainer: ElementRef;

  @ViewChild('btnGroupChart') btnGroupChart: ElementRef;
  @ViewChild('chartContainer') chartContainer: ElementRef;

  mainHeight: number = 0;
  headerHeight: number = 0;

  btnGroupHeight: number = 0;
  listHeight: number = 0;
  listNameHeight: number = 0;

  btnGroupChartHeight: number = 0;
  chartHeight: number = 0;

  dataHeight: number = 0;

  listLabel: string = 'Receita';

  columns: any[] = [];
  rows: any[] = [];
  rowCount: number;
  limit: number = 1000;
  loadingIndicator: boolean = false;

  listType: string = 'income';
  chartType: string = 'month';

  resumeInfo: any = [];

  constructor(
    private dashboardService: DashboardService,
    private responsiveService: ResponsiveService,
    private dataChanged: ChangeDetectorRef,
    private tokenErrorHandler: TokenErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.onResize();
    this.dataChanged.detectChanges();
    this.setGridColumns();
    this.changeListType(this.listType);
  }

  onResize(): void {
    this.responsiveService.checkWidth();
    this.isMobile = this.responsiveService.isMobile;
    this.setHeight();
    this.setGridColumns();
    this.changeListType(this.listType);
  }

  setHeight(): void {
    if (this.mainSection !== undefined) {

      this.mainHeight = this.mainSection.nativeElement.offsetHeight;
      this.headerHeight = this.headerInfo.nativeElement.offsetHeight;

      this.btnGroupHeight = this.btnGroup.nativeElement.offsetHeight;
      this.listNameHeight = this.listName.nativeElement.offsetHeight;

      this.btnGroupChartHeight = this.btnGroupChart.nativeElement.offsetHeight;

      this.dataHeight = this.mainHeight - 10 - 88;

      this.listHeight = this.dataHeight - this.btnGroupHeight - this.listNameHeight;

      this.chartHeight = this.dataHeight - this.btnGroupChartHeight;
    }
  }

  changeListType(name: string): void {
    this.listType = name;
    this.setGridColumns();

    if (name === 'income') {
      this.listLabel = 'Receitas';

      this.loadIncome();
    }
    else if (name === 'expense') {
      this.listLabel = 'Despesas';

      this.loadExpense();
    }
    else if (name === 'goal') {
      this.listLabel = 'Objetivos';

      this.loadGoal();
    }
  }

  setGridColumns(): void {
    if (this.listType === 'income' || this.listType === 'expense') {
      this.columns = [{
        name: 'Descrição', prop: 'Descricao', flex: 3, align: 'align-left'
      }, {
        name: '(R$)', prop: 'Valor', flex: 1, align: 'align-center'
      }];
    }
    else if (this.listType === 'goal') {
      this.columns = [{

      }, {
        name: 'Objetivo', prop: 'Nome', flex: 3, align: 'align-left'
      }, {
        name: '(%)', prop: 'Porcentagem', flex: 1, align: 'align-center'
      }];
    }
  }

  loadIncome(): void {
    this.loadingIndicator = true;
    this.dashboardService.getIncome().subscribe(
      response => {
        if (response.success) {
          this.loadingIndicator = false;
          this.rows = response.receitas;
        }
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  loadExpense(): void {
    this.loadingIndicator = true;
    this.dashboardService.getExpense().subscribe(
      response => {
        if (response.success) {
          this.loadingIndicator = false;
          this.rows = response.despesas;
        }
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  loadGoal(): void {
    this.loadingIndicator = true;
    this.dashboardService.getGoal().subscribe(
      response => {
        if (response.success) {
          this.loadingIndicator = false;
          this.rows = response.objetivos;
        }
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  changeChartType(name: string): void {
    this.chartType = name;

    if (name === 'month') {

    }
    else if (name === 'year') {

    }
  }
}
