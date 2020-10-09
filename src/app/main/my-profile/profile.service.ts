import { HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
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

  updateUserInfo(userInfo: Usuario): Observable<any> {
    const path = `user/update`;

    return this.apiClient.put(path, userInfo);
  }

  uploadProfilePicture(file: File, userId: number): Observable<any> {
    const path = `uploads/profile/?Id=${userId}`,
      fileData = new FormData(),
      headers = new HttpHeaders();

    fileData.append('file', file, file.name);
    headers.append('Content-Type', 'multipart/form-data');

    return this.apiClient.post(path, fileData, { headers: headers, observe: null, responseType: null });
  }

}
