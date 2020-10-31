import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiClient } from 'src/app/core/clients/api.client';
import { Receita } from 'src/app/core/models/income.model';
import { CategoriaReceita } from 'src/app/core/models/incomeCategory.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {


  private reloadGrid = new Subject<any>();
  private changePage = new Subject<any>();
  private openIncomeForm = new Subject<any>();
  private openCategoryForm = new Subject<any>();

  gridCurrentPage: number = 1;

  selectedItem: Receita;

  constructor(
    private apiClient: ApiClient,
    private storageService: LocalStorageService
  ) { }

  getIncome(start: number, limit: number, month: number, year: number): Observable<any> {
    const path = `income/get/?start=${start}&limit=${limit}&userId=${this.storageService.userId}&month=${month}&year=${year}`;

    return this.apiClient.get(path);
  }

  getIncomeResume(month: number, year: number): Observable<any> {
    const path = `income/info/?userId=${this.storageService.userId}&month=${month}&year=${year}`;

    return this.apiClient.get(path);
  }

  insertIncome(incomeInfo: Receita): Observable<any> {
    const path = `income/insert`;

    return this.apiClient.post(path, incomeInfo);
  }

  deleteIncome(incomeId: number): Observable<any> {
    const path = `income/delete/?receitaId=${incomeId}`;

    return this.apiClient.delete(path);
  }

  updateIncome(incomeInfo: Receita): Observable<any> {
    const path = `income/update`;

    return this.apiClient.put(path, incomeInfo);
  }

  getCategories(userId: number): Observable<any> {
    const path = `income/categories/get?userId=${userId}`;

    return this.apiClient.get(path);
  }

  createCategory(category: CategoriaReceita): Observable<any> {
    const path = `income/categories/insert`;

    return this.apiClient.post(path, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    const path = `income/categories/delete?CategoriaId=${categoryId}`;

    return this.apiClient.delete(path);
  }

  updateCategory(category: CategoriaReceita): Observable<any> {
    const path = `income/categories/update`;

    return this.apiClient.put(path, category);
  }

  openFormIncome(data: any): void {
    this.openIncomeForm.next(data);
  }

  callOpenFormIncome(): Observable<any> {
    return this.openIncomeForm.asObservable();
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
