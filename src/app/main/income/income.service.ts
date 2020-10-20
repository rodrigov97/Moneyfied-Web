import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiClient } from 'src/app/core/clients/api.client';
import { Receita } from 'src/app/core/models/income.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {


  private reloadGrid = new Subject<any>();
  private changePage = new Subject<any>();
  private openForm = new Subject<any>();

  gridCurrentPage: number = 1;

  constructor(
    private apiClient: ApiClient,
    private storageService: LocalStorageService
  ) { }

  openFormIncome(pageNumber: any): void {
    this.openForm.next(pageNumber);
  }

  callOpenFormIncome(): Observable<any> {
    return this.openForm.asObservable();
  }

  getIncome(start: number, limit: number, month: number, year: number): Observable<any> {
    const path = `income/get/?start=${start}&limit=${limit}&userId=${this.storageService.userId}&month=${month}&year=${year}`;

    return this.apiClient.get(path);
  }

  insertIncome(incomeInfo: Receita): Observable<any> {
    const path = `income/insert`;

    return this.apiClient.post(path, incomeInfo);
  }

  updateIncome(incomeInfo: Receita): Observable<any> {
    const path = `income/update`;

    return this.apiClient.put(path, incomeInfo);
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
