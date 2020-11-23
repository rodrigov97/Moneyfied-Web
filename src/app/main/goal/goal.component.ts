import { Component, OnInit } from '@angular/core';
import { Objetivo } from 'src/app/core/models/objetivos.model';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { GoalService } from './goal.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {

  isMobile: boolean = false;

  columns: any = [];
  rows: Objetivo[] = [];
  rowCount: number;
  limit: number = 10;
  loadingIndicator: boolean = false;

  constructor(
    private responsiveService: ResponsiveService,
    private goalService: GoalService
  ) { }

  ngOnInit(): void {
    this.onResize();
  }

  onResize(): void {
    this.responsiveService.checkWidth();
    this.isMobile = this.responsiveService.isMobile;
    this.setGridColumns();
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

  openFormGoal():void {
    this.goalService.openFormGoal({
      command: 'open',
      formType: 'Cadastro'
    });
  }

  openFormAddAmount():void {
    this.goalService.openFormAddAmount({
      command: 'open',
      formType: 'Cadastro'
    });
  }
}
