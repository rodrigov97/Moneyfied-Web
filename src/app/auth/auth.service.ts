import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../core/clients/api.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmail: string;

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
    const path = 'send-mail/password-reset-confirmation';

    return this.apiClient.post(path, info);
  }

  resentEmailConfirmation(info: any): Observable<any> {
    const path = 'send-mail/email-confirmation';

    return this.apiClient.post(path, info);
  }
}
