import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Despesa } from 'src/app/core/models/despesa.model';
import { DateAttributes, DateService } from 'src/app/core/services/date.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { TokenErrorHandlerService } from 'src/app/core/services/token-error-handler.service';
import { DataService } from 'src/app/shared/data.service';
import { ExpenseService } from './expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

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
  rows: Despesa[] = [];
  rowCount: number;
  limit: number = 10;
  loadingIndicator: boolean = false;

  expenseResume: any;

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
    private expenseService: ExpenseService,
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

    this.reloadEventSub = this.expenseService.callReloadGridFunction().subscribe(
      () => {
        this.getExpenseData(this.expenseService.gridCurrentPage, this.currentCategoryId, this.currentMonthFilter, this.currentYearFilter);
        this.getExpenseResume(this.currentMonthFilter, this.currentYearFilter);
      });

    this.changePageEventSub = this.expenseService.callGridPageChange().subscribe(
      page => {
        this.getExpenseData(page, 0)
      });

    this.reloadComboCategories = this.expenseService.callLoadComboCategories().subscribe(() => {
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

    this.getExpenseData(1, 0);
    this.getExpenseResume(month, year);
    this.loadCategories();
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

  setHeight(): void {
    if (this.mainSection !== undefined) {

      this.mainHeight = this.mainSection.nativeElement.offsetHeight;
      this.headerHeight = this.headerInfo.nativeElement.offsetHeight;

      this.dataHeight = (this.mainHeight - this.headerHeight) - 10;
    }
  }

  setGridColumns(): void {
    if (!this.isMobile) {
      this.columns = [{
        name: 'Descrição', prop: 'Descricao', flex: 3, align: 'align-left'
      }, {
        name: 'Valor (R$)', prop: 'ParcelaValor', flex: 1, align: 'align-right'
      }, {
        name: 'Categoria', prop: 'Categoria', flex: 1, align: 'align-center'
      }, {
        name: 'Pagamento', prop: 'DataPagamento', flex: 1.2, align: 'align-center'
      }, {
        name: 'Nº Parcela', prop: 'ParcelaNumero', flex: 1, align: 'align-center'
      }];
    }
    else {
      this.columns = [{
        name: 'Descrição', prop: 'Descricao', flex: 3, align: 'align-left'
      }, {
        name: 'R$', prop: 'ParcelaValor', flex: 1, align: 'align-right'
      }, {
        name: 'Nº', prop: 'ParcelaNumero', flex: 1, align: 'align-center'
      }];
    }
  }

  currentMonth(current: number): string {
    return this.dateService.months[current].value;
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
      year = this.year.value;

    this.currentMonthFilter = month;
    this.currentYearFilter = year;
    this.currentCategoryId = this.getCategoryId(this.category.value);

    this.getExpenseData(1, this.currentCategoryId, month, year);
    this.getExpenseResume(month, year);
  }

  getCategoryId(name: string): number {
    var category = this.categoryItems.find(category => category.value === name);
    return category.CategoriaDespesaId;
  }

  getExpenseData(page: number, categoryId: number, month?: number, year?: number): void {
    var currentPage = this.getPage(page),
      date = new Date(),
      mes = month ? month : (this.currentMonthFilter ? this.currentMonthFilter : date.getMonth() + 1),
      ano = year ? year : (this.currentYearFilter ? this.currentYearFilter : date.getFullYear()),
      categoryId = categoryId === undefined ? 0 : categoryId;

    this.loadingIndicator = true;
    this.expenseService.getExpense(currentPage, this.limit, categoryId, mes, ano).subscribe(
      response => {
        this.rowCount = response.totalLinhas;
        this.rows = response.despesas;
        this.loadingIndicator = false;
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  getExpenseResume(month: number, year: number): void {
    var date = new Date(),
      mes = month ? month : (this.currentMonthFilter ? this.currentMonthFilter : date.getMonth() + 1),
      ano = year ? year : (this.currentYearFilter ? this.currentYearFilter : date.getFullYear());

    this.expenseService.getExpenseResume(mes, ano).subscribe(
      response => {
        if (response.success) {
          this.expenseResume = response.values;
        }
        else {
          this.expenseResume = {
            MaxDesc: '-',
            MaxValue: '0',
            MinDesc: '-',
            MinValue: '0',
            TotalValue: '0',
          };
        }
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  addExpense(): void {
    this.expenseService.openFormExpense({
      command: 'open',
      title: 'Atenção',
      form: 'Despesa',
      formType: 'Cadastro',
      isMobile: this.isMobile
    });
  }

  removeExpense(): void {
    if (this.expenseService.selectedItem) {
      var despesaId = this.expenseService.selectedItem.DespesaId;

      this.loadingIndicator = true;
      this.expenseService.deleteExpense(despesaId).subscribe(
        response => {
          if (response.success) {
            this.getExpenseData(this.expenseService.gridCurrentPage, this.currentCategoryId, this.currentMonthFilter, this.currentYearFilter);
            this.getExpenseResume(this.currentMonthFilter, this.currentYearFilter);
            this.loadingIndicator = false;
          }
          else {
            this.dataService.openErrorDialog({
              command: 'open',
              title: 'Atenção',
              content: 'Erro ao excluír a renda selecionada.'
            });
          }
        },
        error => {
          if (error.error && error.status !== 500)
            this.tokenErrorHandler.handleError(error.error);
        });
    }
  }

  callFormCategory(): void {
    this.expenseService.openFormCategory({
      command: 'open',
      formType: 'Cadastro'
    });
  }


  loadCategories(): void {
    this.expenseService.getCategories(this.localStorage.userId).subscribe(
      response => {
        if (response.success) {
          response.categories.unshift({ value: 'Nenhum', CategoriId: 0 });
          this.categoryItems = response.categories;
        }
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }
}
