import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiClient } from 'src/app/core/clients/api.client';
import { Objetivo } from 'src/app/core/models/objetivo.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private openGoalForm = new Subject<any>();
  private openAddAmountForm = new Subject<any>();

  private reloadGrid = new Subject<any>();
  private changePage = new Subject<any>();

  gridCurrentPage: number = 1;

  selectedItem: Objetivo;

  constructor(
    private apiClient: ApiClient,
    private storageService: LocalStorageService
  ) { }

  private readonly ROUTE_URL = 'goal';

  getGoal(start: number, limit: number, month: number, year: number, name: string): Observable<any> {
    const path = `${this.ROUTE_URL}/get/?start=${start}&limit=${limit}&userId=${this.storageService.userId}&month=${month}&year=${year}&name=${name}`;

    return this.apiClient.get(path);
  }

  addGoal(goal: Objetivo): Observable<any> {
    return this.apiClient.post(`${this.ROUTE_URL}/insert`, goal);
  }

  updateGoal(goal: Objetivo): Observable<any> {
    return this.apiClient.put(`${this.ROUTE_URL}/update`, goal);
  }

  deleteGoal(goalId: number): Observable<any> {
    const path = `${this.ROUTE_URL}/delete/?objetivoId=${goalId}`;

    return this.apiClient.delete(path);
  }

  addAmount(goalId: number, amount: number): Observable<any> {
    return this.apiClient.put(`${this.ROUTE_URL}/add-amount?goalId=${goalId}&amount=${amount}`);
  }

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

  reloadGridEvent() {
    this.reloadGrid.next();
  }

  callReloadGridFunction(): Observable<any> {
    return this.reloadGrid.asObservable();
  }

  gridPageChange(pageNumber: number): void {
    this.changePage.next(pageNumber);
  }

  callGridPageChange(): Observable<any> {
    return this.changePage.asObservable();
  }
}
