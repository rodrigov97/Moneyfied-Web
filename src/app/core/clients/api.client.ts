import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  observe: any;
  params?: HttpParams | { [param: string]: string | string[]; };
  reportProgress?: boolean;
  responseType: any;
  withCredentials?: boolean;
}

@Injectable()
export class ApiClient {
  private readonly scope = 'api/v1';

  constructor(
    private http: HttpClient,
  ) { }

  private apiUrl(path?: string): string {
    return [environment.BaseUrl, this.scope, path].filter(Boolean).join('/');
  }

  get(path: string, options?: HttpOptions): Observable<any> {

    return this.http.get(this.apiUrl(path), options)
  }

  post(path: string, body?: any, options?: HttpOptions): Observable<any> {
    return this.http.post(this.apiUrl(path), body, options)
  }

  delete(path: string, options?: HttpOptions): Observable<any> {
    return this.http.delete(this.apiUrl(path), options)
  }
}
