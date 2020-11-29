import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ApiClient } from 'src/app/core/clients/api.client';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly URL: string = 'dashboard';
  private readonly userId: number = this.storageService.userId;

  private changePage = new Subject<any>();

  gridCurrentPage: number = 1;

  constructor(
    private apiClient: ApiClient,
    private storageService: LocalStorageService
  ) { }

  getIncome(): Observable<any> {
    return this.apiClient.get(`${this.URL}/income?userId=${this.userId}`);
  }

  getExpense(): Observable<any> {
    return this.apiClient.get(`${this.URL}/expense?userId=${this.userId}`);
  }

  getChartInfo(): Observable<any> {
    return this.apiClient.get(`${this.URL}/chart-info?userId=${this.userId}`);
  }

  getResumeInfo(): Observable<any> {
    return this.apiClient.get(`${this.URL}/chart-info?userId=${this.userId}`);
  }

  gridPageChange(pageNumber: number): void {
    this.changePage.next(pageNumber);
  }

  callGridPageChange(): Observable<any> {
    return this.changePage.asObservable();
  }
}
