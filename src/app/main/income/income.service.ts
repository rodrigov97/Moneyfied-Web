import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from 'src/app/core/clients/api.client';
import { Receita } from 'src/app/core/models/income.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
    private apiClient: ApiClient
  ) { }

  getIncome(): Observable<any> {
    const path = `income/get`;

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
}
