import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiClient } from 'src/app/core/clients/api.client';
import { Receita } from 'src/app/core/models/income.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  toggleFormRegister: any = { command: '' };
  private toggleFormRegisterValue = new BehaviorSubject<any>(this.toggleFormRegister);
  currentToggleFormRegisterValue = this.toggleFormRegisterValue.asObservable();

  private reloadGrid = new Subject<any>();

  constructor(
    private apiClient: ApiClient,
    private storageService: LocalStorageService
  ) { }

  openFormRegisterModal(value: any): void {
    this.toggleFormRegisterValue.next(value);
  }

  getIncome(): Observable<any> {
    const path = `income/get/?userId=${this.storageService.userId}`;

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
  callReloadGridFunction(): Observable<any>{
    return this.reloadGrid.asObservable();
  }
}
