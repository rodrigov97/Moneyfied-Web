import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Despesa } from 'src/app/core/models/despesa.model';
import { DateAttributes, DateService } from 'src/app/core/services/date.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
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

  currentMonthFilter: number;
  currentYearFilter: number;
  currentCategoryId: number = 0;

  constructor(
    private responsiveService: ResponsiveService,
    private localStorage: LocalStorageService,
    private dateService: DateService,
    private dataService: DataService,
    private dataChanged: ChangeDetectorRef,
    private expenseService: ExpenseService
  ) {
    const date = new Date(),
      month = date.getMonth(),
      year = date.getFullYear();

    this.formFilters = new FormGroup({
      Mes: new FormControl(this.currentMonth(month)),
      Ano: new FormControl(year),
      Categoria: new FormControl('Nenhum')
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

  }

  callFormCategory(): void {
    this.expenseService.openFormCategory({
      command: 'open',
      formType: 'Cadastro'
    });
  }
}
