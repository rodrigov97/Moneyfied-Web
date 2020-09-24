import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiClient, HttpOptions } from '../core/clients/api.client';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiClient: ApiClient
  ) { }

  login(credentials: any): Observable<any> {
    const path = 'login';

    return this.apiClient.post(path, credentials);
  }

  register(info: any): Observable<any> {
    const path = 'user/register';

    return this.apiClient.post(path, info);
  }

  resetPassword(info: any): Observable<any> {
    const path = 'send-mail/confirmation';

    return this.apiClient.post(path, info);
  }
}
