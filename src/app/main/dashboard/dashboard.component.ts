import { ChangeDetectorRef } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResponsiveService } from 'src/app/core/services/responsive.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isMobile: boolean = true;

  isLoading: boolean = true;

  @ViewChild('main') mainSection: ElementRef;
  @ViewChild('headerInfo') headerInfo: ElementRef;
  @ViewChild('dataContent') dataContent: ElementRef;

  mainHeight: number = 0;
  headerHeight: number = 0;

  dataHeight: number = 0;

  columns: any = [];
  rows: any[] = [];
  rowCount: number;
  limit: number = 10;
  loadingIndicator: boolean = false;

  constructor(
    private responsiveService: ResponsiveService,
    private dataChanged: ChangeDetectorRef
  ) { }

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
}
