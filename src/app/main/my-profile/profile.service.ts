import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario.model';
import { ApiClient } from '../../core/clients/api.client';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private apiClient: ApiClient
    ) { }

  getUserInfo(userId: any): Observable<any> {
    const path = `user/get/?Id=${userId}`;

    return this.apiClient.get(path);
  }

  updateUserInfo(userInfo: Usuario) {
    const path = `user/update`;

    return this.apiClient.put(path, userInfo);
  }
}
