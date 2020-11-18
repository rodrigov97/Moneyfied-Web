import { flatten } from '@angular/compiler';
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Receita } from 'src/app/core/models/receita.model';
import { CustomValidators } from 'src/app/core/services/custom-validators';
import { DateAttributes, DateService } from 'src/app/core/services/date.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { TokenErrorHandlerService } from 'src/app/core/services/token-error-handler.service';
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

  categoryItems: any = []

  columns: any = [];
  rows: Receita[] = [];
  rowCount: number;
  limit: number = 10;
  loadingIndicator: boolean = false;

  incomeResume: any;

  reloadEventSub: Subscription;
  changePageEventSub: Subscription;
  reloadComboCategories: Subscription;

  currentMonthFilter: number;
  currentYearFilter: number;
  currentCategoryId: number = 0;

  constructor(
    private responsiveService: ResponsiveService,
    private localStorage: LocalStorageService,
    private dateService: DateService,
    private dataService: DataService,
    private dataChanged: ChangeDetectorRef,
    private incomeService: IncomeService,
    private tokenErrorHandler: TokenErrorHandlerService
  ) {
    const date = new Date(),
      month = date.getMonth(),
      year = date.getFullYear();

    this.formFilters = new FormGroup({
      Mes: new FormControl(this.currentMonth(month)),
      Ano: new FormControl(year),
      Categoria: new FormControl('Nenhum')
    });

    this.reloadEventSub = this.incomeService.callReloadGridFunction().subscribe(
      () => {
        this.getIncomeData(this.incomeService.gridCurrentPage, this.currentCategoryId, this.currentMonthFilter, this.currentYearFilter);
        this.getIncomeResume(this.currentMonthFilter, this.currentYearFilter);
      });

    this.changePageEventSub = this.incomeService.callGridPageChange().subscribe(
      page => {
        this.getIncomeData(page, 0)
      });

    this.reloadComboCategories = this.incomeService.callLoadComboCategories().subscribe(() => {
      this.loadCategories();
    });
  }

  get month(): AbstractControl {
    return this.formFilters.get('Mes');
  }

  get year(): AbstractControl {
    return this.formFilters.get('Ano');
  }

  get category(): AbstractControl {
    return this.formFilters.get('Categoria');
  }

  get months(): DateAttributes[] {
    return this.dateService.months;
  }

  get years(): any {
    return this.dateService.years;
  }


  ngOnInit(): void {
    var date = new Date(),
      month = date.getMonth() + 1,
      year = date.getFullYear();



    this.getIncomeData(1, 0);
    this.getIncomeResume(month, year);
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.reloadEventSub.unsubscribe();
    this.changePageEventSub.unsubscribe();
  }

  currentMonth(current: number): string {
    return this.dateService.months[current].value;
  }

  ngAfterViewInit(): void {
    this.onResize();
    this.dataChanged.detectChanges();
  }

  onResize(): void {
    this.responsiveService.checkWidth();
    this.isMobile = this.responsiveService.isMobile;
    this.setHeight();
    this.setGridColumns();
  }

  getCategoryId(name: string): number {
    var category = this.categoryItems.find(category => category.value === name);
    return category.CategoriaReceitaId;
  }

  setGridColumns(): void {
    if (!this.isMobile) {
      this.columns = [{
        name: 'Descrição', prop: 'Descricao', flex: 3, align: 'align-left'
      }, {
        name: 'Valor (R$)', prop: 'Valor', flex: 1, align: 'align-right'
      }, {
        name: 'Categoria', prop: 'Categoria', flex: 1, align: 'align-center'
      }, {
        name: 'Data de Recebimento', prop: 'DataRecebimento', flex: 1.2, align: 'align-center'
      }];
    }
    else {
      this.columns = [{
        name: 'Descrição', prop: 'Descricao', flex: 3, align: 'align-left'
      }, {
        name: 'Valor (R$)', prop: 'Valor', flex: 1, align: 'align-right'
      }];
    }
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

  callFormCategory(): void {
    this.incomeService.openFormCategory({
      command: 'open',
      formType: 'Cadastro'
    });
  }

  removeIncome(): void {
    if (this.incomeService.selectedItem) {
      var receitaId = this.incomeService.selectedItem.ReceitaId;

      this.loadingIndicator = true;
      this.incomeService.deleteIncome(receitaId).subscribe(
        response => {
          if (response.success) {
            this.getIncomeData(this.incomeService.gridCurrentPage, this.currentCategoryId, this.currentMonthFilter, this.currentYearFilter);
            this.getIncomeResume(this.currentMonthFilter, this.currentYearFilter);
            this.loadingIndicator = false;
          }
          else {
            this.dataService.openErrorDialogModal({
              command: 'open',
              title: 'Atenção',
              content: 'Erro ao excluír a renda selecionada.'
            });
          }
        },
        error => {
          if (error.error)
            this.tokenErrorHandler.handleError(error.error);
        });
    }
  }

  filterData(): void {
    var month = this.dateService.getMonthNumber(this.month.value),
      year = this.year.value;

    this.currentMonthFilter = month;
    this.currentYearFilter = year;
    this.currentCategoryId = this.getCategoryId(this.category.value);

    this.getIncomeData(1, this.currentCategoryId, month, year);
    this.getIncomeResume(month, year);
  }

  getIncomeData(page: number, categoryId: number, month?: number, year?: number): void {
    var currentPage = this.getPage(page),
      date = new Date(),
      mes = month ? month : (this.currentMonthFilter ? this.currentMonthFilter : date.getMonth() + 1),
      ano = year ? year : (this.currentYearFilter ? this.currentYearFilter : date.getFullYear()),
      categoryId = categoryId === undefined ? 0 : categoryId;



    this.loadingIndicator = true;
    this.incomeService.getIncome(currentPage, this.limit, categoryId, mes, ano).subscribe(
      response => {
        this.rowCount = response.totalLinhas;
        this.rows = response.receitas;
        this.loadingIndicator = false;
      },
      error => {
        if (error.error)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  loadCategories(): void {
    this.incomeService.getCategories(this.localStorage.userId).subscribe(
      response => {
        if (response.success) {
          response.categories.unshift({ value: 'Nenhum', CategoriId: 0 });
          this.categoryItems = response.categories;
        }
      },
      error => {
        if (error.error)
          this.tokenErrorHandler.handleError(error.error);
      });
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

  getIncomeResume(month: number, year: number): void {
    var date = new Date(),
      mes = month ? month : (this.currentMonthFilter ? this.currentMonthFilter : date.getMonth() + 1),
      ano = year ? year : (this.currentYearFilter ? this.currentYearFilter : date.getFullYear());

    this.incomeService.getIncomeResume(mes, ano).subscribe(
      response => {
        if (response.success) {
          this.incomeResume = response.values;
        }
        else {
          this.incomeResume = {
            MaxDesc: '-',
            MaxValue: '0',
            MinDesc: '-',
            MinValue: '0',
            TotalValue: '0',
          };
        }
      },
      error => {
        if (error.error)
          this.tokenErrorHandler.handleError(error.error);
      });
  }
}
