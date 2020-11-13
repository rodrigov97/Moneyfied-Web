import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiClient } from 'src/app/core/clients/api.client';
import { Despesa } from 'src/app/core/models/despesa.model';
import { CategoriaDespesa } from 'src/app/core/models/despesaCategoria.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly ROUTE_URL = 'expense';

  private reloadGrid = new Subject<any>();
  private changePage = new Subject<any>();
  private openExpenseForm = new Subject<any>();
  private openCategoryForm = new Subject<any>();
  private loadCategories = new Subject<any>();

  gridCurrentPage: number = 1;

  selectedItem: Despesa;

  constructor(
    private apiClient: ApiClient,
    private storageService: LocalStorageService
  ) { }

  getExpense(start: number, limit: number, categoryId: number, month: number, year: number): Observable<any> {
    const path = `${this.ROUTE_URL}/get/?start=${start}&limit=${limit}&userId=${this.storageService.userId}&categoryId=${categoryId}&month=${month}&year=${year}`;

    return this.apiClient.get(path);
  }

  getExpenseResume(month: number, year: number): Observable<any> {
    const path = `${this.ROUTE_URL}/info/?userId=${this.storageService.userId}&month=${month}&year=${year}`;

    return this.apiClient.get(path);
  }

  insertExpense(expenseInfo: Despesa): Observable<any> {
    const path = `${this.ROUTE_URL}/insert`;

    return this.apiClient.post(path, expenseInfo);
  }

  updateExpense(expenseInfo: Despesa): Observable<any> {
    const path = `${this.ROUTE_URL}/update`;

    return this.apiClient.put(path, expenseInfo);
  }

  deleteExpense(expenseId: number): Observable<any> {
    const path = `${this.ROUTE_URL}/delete/?receitaId=${expenseId}`;

    return this.apiClient.delete(path);
  }

  getCategories(userId: number): Observable<any> {
    const path = `${this.ROUTE_URL}/categories/get?userId=${userId}`;

    return this.apiClient.get(path);
  }

  createCategory(category: CategoriaDespesa): Observable<any> {
    const path = `${this.ROUTE_URL}/categories/insert`;

    return this.apiClient.post(path, category);
  }

  updateCategory(category: CategoriaDespesa): Observable<any> {
    const path = `${this.ROUTE_URL}/categories/update`;

    return this.apiClient.put(path, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    const path = `${this.ROUTE_URL}/categories/delete?CategoriaId=${categoryId}`;

    return this.apiClient.delete(path);
  }

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

  loadComboCategories(): void {
    this.loadCategories.next();
  }

  callLoadComboCategories(): Observable<any> {
    return this.loadCategories.asObservable();
  }
}
