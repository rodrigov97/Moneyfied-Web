import { flatten } from '@angular/compiler';
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Receita } from 'src/app/core/models/income.model';
import { CustomValidators } from 'src/app/core/services/custom-validators';
import { DateAttributes, DateService } from 'src/app/core/services/date.service';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { DataService } from 'src/app/shared/data.service';
import { IncomeService } from './income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit, OnDestroy {

  @ViewChild('main') mainSection: ElementRef;
  @ViewChild('headerInfo') headerInfo: ElementRef;
  @ViewChild('dataContent') dataContent: ElementRef;

  formFilters: FormGroup;

  mainHeight: number = 0;
  headerHeight: number = 0;

  dataHeight: number = 0;

  isMobile: boolean = false;

  isLoading: boolean = false;

  columns: any = [];
  rows: Receita[] = [];
  rowCount: number;
  limit: number = 10;
  loadingIndicator: boolean = false;

  reloadEventSub: Subscription;
  changePageEventSub: Subscription;

  currentMonthFilter: number;
  currentYearFilter: number;

  constructor(
    private responsiveService: ResponsiveService,
    private dateService: DateService,
    private dataChanged: ChangeDetectorRef,
    private incomeService: IncomeService
  ) {
    const date = new Date(),
      month = date.getMonth(),
      year = date.getFullYear();

    this.formFilters = new FormGroup({
      Mes: new FormControl(this.currentMonth(month)),
      Ano: new FormControl(year),
    });

    this.reloadEventSub = this.incomeService.callReloadGridFunction().subscribe(
      () => {
        this.getIncomeData(this.incomeService.gridCurrentPage, this.currentMonthFilter, this.currentYearFilter);
      });

    this.changePageEventSub = this.incomeService.callGridPageChange().subscribe(
      page => {
        this.getIncomeData(page);
      });
  }

  ngOnInit(): void {
    this.columns = [{ name: 'Descrição', prop: 'Descricao' }, { nome: 'Valor', prop: 'Valor' }];

    this.getIncomeData(1);
  }

  ngOnDestroy(): void {
    this.reloadEventSub.unsubscribe();
    this.changePageEventSub.unsubscribe();
  }

  get month(): AbstractControl {
    return this.formFilters.get('Mes');
  }

  get year(): AbstractControl {
    return this.formFilters.get('Ano');
  }

  currentMonth(current: number): string {
    return this.dateService.months[current].value;
  }

  ngAfterViewInit(): void {
    this.onResize();
    this.dataChanged.detectChanges();
  }

  get months(): DateAttributes[] {
    return this.dateService.months;
  }

  get years(): any {
    return this.dateService.years;
  }

  onResize(): void {
    this.responsiveService.checkWidth();
    this.isMobile = this.responsiveService.isMobile;
    this.setHeight();
  }

  setHeight(): void {
    if (this.mainSection !== undefined) {

      this.mainHeight = this.mainSection.nativeElement.offsetHeight;
      this.headerHeight = this.headerInfo.nativeElement.offsetHeight;

      this.dataHeight = (this.mainHeight - this.headerHeight) - 10;
    }
  }

  addIncome(): void {
    this.incomeService.openFormIncome({
      command: 'open',
      title: 'Atenção',
      form: 'Receita',
      formType: 'Cadastro'
    });
  }

  filterData(): void {
    var month = this.dateService.getMonthNumber(this.month.value),
      year = this.year.value;

    this.currentMonthFilter = month;
    this.currentYearFilter = year;

    this.getIncomeData(1, month, year);
  }

  getIncomeData(page: number, month?: number, year?: number): void {
    var date = new Date(),
      mes = month ? month : (this.currentMonthFilter ? this.currentMonthFilter : date.getMonth() + 1),
      ano = year ? year : (this.currentYearFilter ? this.currentYearFilter : date.getFullYear());

    if (page === 1) {
      page = 0;
    }
    else if (page > 1) {
      page = (page * this.limit) - this.limit;
    }

    this.loadingIndicator = true;
    this.incomeService.getIncome(page, this.limit, mes, ano).subscribe(
      response => {
        this.rowCount = response.totalLinhas;
        this.rows = response.receitas;
        this.loadingIndicator = false;
      });
  }
}
