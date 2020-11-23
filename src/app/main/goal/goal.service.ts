import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Objetivo } from 'src/app/core/models/objetivos.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  selectedItem: Objetivo;

  private openGoalForm = new Subject<any>();
  private openAddAmountForm = new Subject<any>();

  constructor() { }

  openFormGoal(data: any): void {
    this.openGoalForm.next(data);
  }

  callOpenFormGoal(): Observable<any> {
    return this.openGoalForm.asObservable();
  }

  openFormAddAmount(data: any): void {
    this.openAddAmountForm.next(data);
  }

  callOpenFormAddAmount(): Observable<any> {
    return this.openAddAmountForm.asObservable();
  }
}
