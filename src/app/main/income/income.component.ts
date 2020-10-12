import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ResponsiveService } from 'src/app/core/services/responsive.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  @ViewChild('main') mainSection: ElementRef;
  @ViewChild('headerInfo') headerInfo: ElementRef;
  @ViewChild('dataContent') dataContent: ElementRef;

  mainHeight: number;
  headerHeight: number;

  dataHeight: number = 0;

  isMobile: boolean;

  constructor(
    private responsiveService: ResponsiveService,
    private detectChanges: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.onResize();
    this.detectChanges.detectChanges();
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
}
