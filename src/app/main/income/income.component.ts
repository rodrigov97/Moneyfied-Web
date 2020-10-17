import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
export class IncomeComponent implements OnInit {

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

  constructor(
    private responsiveService: ResponsiveService,
    private dateService: DateService,
    private dataService: DataService,
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
  }

  ngOnInit(): void {
    this.columns = [{ name: 'Descrição', prop: 'Descricao'}, { nome: 'Valor', prop: 'Valor'}];

    this.getIncomeData();
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
    this.dataService.openFormRegisterModal({
      command: 'open',
      title: 'Atenção',
      form: 'Receita',
      formType: 'Cadastro'
    });
  }

  getIncomeData(): void {

    this.incomeService.getIncome().subscribe(
      response => {
        this.rows = response.receitas;
      });
  }
}
