import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/core/services/custom-validators';
import { DateAttributes, DateService } from 'src/app/core/services/date.service';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { DataService } from 'src/app/shared/data.service';

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

  mainHeight: number;
  headerHeight: number;

  dataHeight: number = 0;

  isMobile: boolean;

  constructor(
    private responsiveService: ResponsiveService,
    private detectChanges: ChangeDetectorRef,
    private dateService: DateService,
    private dataService: DataService
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
    this.detectChanges.detectChanges();
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

  incomeStatus(value: number): {} {
    if (value < 0) {
      return {
        'color': '#e71426'
      }
    }
    else if (value > 0) {
      return {
        'color': '#13ca66'
      }
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
}
