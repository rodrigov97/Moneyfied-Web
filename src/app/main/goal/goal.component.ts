import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Objetivo } from 'src/app/core/models/objetivo.model';
import { DateAttributes, DateService } from 'src/app/core/services/date.service';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { TokenErrorHandlerService } from 'src/app/core/services/token-error-handler.service';
import { DataService } from 'src/app/shared/data.service';
import { GoalService } from './goal.service';

export enum GoalStatus {
  Alcancado = 'Alcancado',
  EmAndamento = 'EmAndamento',
  NaoAlcancado = 'NaoAlcancado',
}

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {

  isMobile: boolean = false;

  isLoading: boolean = false;

  columns: any = [];
  rows: Objetivo[] = [];
  rowCount: number;
  limit: number = 12;
  loadingIndicator: boolean = false;

  formFilters: FormGroup;

  reloadEventSub: Subscription;
  changePageEventSub: Subscription;

  currentMonthFilter: number;
  currentYearFilter: number;
  currentNameFilter: string = '';

  constructor(
    private responsiveService: ResponsiveService,
    private goalService: GoalService,
    private dateService: DateService,
    private dataService: DataService,
    private tokenErrorHandler: TokenErrorHandlerService
  ) {
    const date = new Date(),
      month = date.getMonth(),
      year = date.getFullYear();

    this.formFilters = new FormGroup({
      Mes: new FormControl(this.currentMonth(month)),
      Ano: new FormControl(year),
      Nome: new FormControl('')
    });

    this.reloadEventSub = this.goalService.callReloadGridFunction().subscribe(
      () => {
        this.getGoalData(this.goalService.gridCurrentPage, this.currentMonthFilter, this.currentYearFilter, this.currentNameFilter);
      });

    this.changePageEventSub = this.goalService.callGridPageChange().subscribe(
      page => {
        this.getGoalData(page, 0)
      });
  }

  get month(): AbstractControl {
    return this.formFilters.get('Mes');
  }

  get year(): AbstractControl {
    return this.formFilters.get('Ano');
  }

  get name(): AbstractControl {
    return this.formFilters.get('Nome');
  }

  get months(): DateAttributes[] {
    return this.dateService.months;
  }

  get years(): any {
    return this.dateService.years;
  }

  ngOnInit(): void {
    this.getGoalData(1, 0, 0, '');

    this.onResize();
  }

  onResize(): void {
    this.responsiveService.checkWidth();
    this.isMobile = this.responsiveService.isMobile;
    this.setGridColumns();
  }

  currentMonth(current: number): string {
    return this.dateService.months[current].value;
  }

  setGridColumns(): void {
    if (!this.isMobile) {
      this.columns = [{
        name: 'Nome', prop: 'Nome', flex: 3, align: 'align-left'
      }, {
        name: 'Valor (R$)', prop: 'ValorAtual', flex: 1, align: 'align-center'
      }, {
        name: 'Meta', prop: 'ValorObjetivo', flex: 1, align: 'align-center'
      }, {
        name: '%', prop: 'Porcentagem', flex: 1, align: 'align-center'
      }, {
        name: 'Data Limite', prop: 'DataLimite', flex: 1.2, align: 'align-center'
      }];
    }
    else {
      this.columns = [{
        name: 'Nome', prop: 'Nome', flex: 3, align: 'align-left'
      }, {
        name: '%', prop: 'Porcentagem', flex: 1, align: 'align-center'
      }];
    }
  }

  getPage(page: number): number {
    var value = 0;
    if (page === 1) {
      value = 0;
    }
    else if (page > 1) {
      value = (page * this.limit) - this.limit;
    }
    return value;
  }

  filterData(): void {
    var month = this.dateService.getMonthNumber(this.month.value),
      year = this.year.value,
      name = this.name.value;

    this.currentMonthFilter = month;
    this.currentYearFilter = year;
    this.currentNameFilter = name;

    this.getGoalData(1, month, year, name);
  }

  openFormGoal(): void {
    this.goalService.openFormGoal({
      command: 'open',
      formType: 'Cadastro'
    });
  }

  openFormAddAmount(): void {
    if (this.goalService.selectedItem.Status === 'Alcancado') {
      this.dataService.openWarningDialogModal({
        command: 'open',
        title: 'Atenção',
        content: 'Esse objetivo já foi alcançado !'
      });
    }
    else {
      if (this.goalService.selectedItem) {
        this.goalService.openFormAddAmount({
          command: 'open',
          data: this.goalService.selectedItem
        });
      }
    }
  }

  getGoalData(page: number, month?: number, year?: number, name?: string): void {
    var currentPage = this.getPage(page),
      date = new Date(),
      mes = month ? month : (this.currentMonthFilter ? this.currentMonthFilter : date.getMonth() + 1),
      ano = year ? year : (this.currentYearFilter ? this.currentYearFilter : date.getFullYear());

    this.loadingIndicator = true;
    this.goalService.getGoal(currentPage, this.limit, mes, ano, name).subscribe(
      response => {
        this.rowCount = response.totalLinhas;
        this.rows = response.objetivos;
        this.loadingIndicator = false;
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  deleteGoal(): void {
    if (this.goalService.selectedItem) {
      var despesaId = this.goalService.selectedItem.ObjetivoId;

      this.loadingIndicator = true;

      this.goalService.deleteGoal(despesaId).subscribe(
        response => {
          if (response.success) {
            this.getGoalData(this.goalService.gridCurrentPage, this.currentMonthFilter, this.currentYearFilter, this.currentNameFilter);
            this.loadingIndicator = false;
          }
          else {
            this.dataService.openErrorDialogModal({
              command: 'open',
              title: 'Atenção',
              content: 'Erro ao excluír o objetivo selecionado.'
            });
          }
        },
        error => {
          if (error.error && error.status !== 500)
            this.tokenErrorHandler.handleError(error.error);
        });
    }
  }
}
