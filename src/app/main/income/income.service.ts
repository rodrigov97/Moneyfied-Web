import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiClient } from 'src/app/core/clients/api.client';
import { Receita } from 'src/app/core/models/receita.model';
import { CategoriaReceita } from 'src/app/core/models/receitaCategoria.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private readonly ROUTE_URL = 'income';

  private reloadGrid = new Subject<any>();
  private changePage = new Subject<any>();
  private openIncomeForm = new Subject<any>();
  private openCategoryForm = new Subject<any>();
  private loadCategories = new Subject<any>();

  gridCurrentPage: number = 1;

  selectedItem: Receita;

  constructor(
    private apiClient: ApiClient,
    private storageService: LocalStorageService
  ) { }

  getIncome(start: number, limit: number, categoryId: number, month: number, year: number): Observable<any> {
    const path = `${this.ROUTE_URL}/get/?start=${start}&limit=${limit}&userId=${this.storageService.userId}&categoryId=${categoryId}&month=${month}&year=${year}`;

    return this.apiClient.get(path);
  }

  getIncomeResume(month: number, year: number): Observable<any> {
    const path = `${this.ROUTE_URL}/info/?userId=${this.storageService.userId}&month=${month}&year=${year}`;

    return this.apiClient.get(path);
  }

  insertIncome(incomeInfo: Receita): Observable<any> {
    const path = `${this.ROUTE_URL}/insert`;

    return this.apiClient.post(path, incomeInfo);
  }

  deleteIncome(incomeId: number): Observable<any> {
    const path = `${this.ROUTE_URL}/delete/?receitaId=${incomeId}`;

    return this.apiClient.delete(path);
  }

  updateIncome(incomeInfo: Receita): Observable<any> {
    const path = `${this.ROUTE_URL}/update`;

    return this.apiClient.put(path, incomeInfo);
  }

  getCategories(userId: number): Observable<any> {
    const path = `${this.ROUTE_URL}/categories/get?userId=${userId}`;

    return this.apiClient.get(path);
  }

  createCategory(category: CategoriaReceita): Observable<any> {
    const path = `${this.ROUTE_URL}/categories/insert`;

    return this.apiClient.post(path, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    const path = `${this.ROUTE_URL}/categories/delete?CategoriaId=${categoryId}`;

    return this.apiClient.delete(path);
  }

  updateCategory(category: CategoriaReceita): Observable<any> {
    const path = `${this.ROUTE_URL}/categories/update`;

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

  loadComboCategories(): void {
    this.loadCategories.next();
  }

  callLoadComboCategories(): Observable<any> {
    return this.loadCategories.asObservable();
  }
}
