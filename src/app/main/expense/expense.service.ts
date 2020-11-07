import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiClient } from 'src/app/core/clients/api.client';
import { Despesa } from 'src/app/core/models/despesa.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


  private reloadGrid = new Subject<any>();
  private changePage = new Subject<any>();
  private openExpenseForm = new Subject<any>();
  private openCategoryForm = new Subject<any>();

  gridCurrentPage: number = 1;

  selectedItem: Despesa;

  constructor(
    private apiClient: ApiClient,
    private storageService: LocalStorageService
  ) { }

  
  openFormExpense(data: any): void {
    this.openExpenseForm.next(data);
  }

  callOpenFormExpense(): Observable<any> {
    return this.openExpenseForm.asObservable();
  }

  openFormCategory(data: any): void {
    this.openCategoryForm.next(data);
  }

  callOpenFormCategory(): Observable<any> {
    return this.openCategoryForm.asObservable();
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
