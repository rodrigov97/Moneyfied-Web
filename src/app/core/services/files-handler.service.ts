import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FilesHandlerService {

  constructor(
    private localStorage: LocalStorageService
  ) { }

  generateUserProfileImage(file: File): File {
    const usuario = this.localStorage.userInfo,
      extension = this.getFileExtension(file),
      blob = file.slice(0, file.size, 'image/png'),
      userId = this.localStorage.userId,
      userName = usuario.Nome.split(' ')[0],
      date = new Date(),
      year = date.getFullYear();

    return new File([blob], `${userId}-${userName}-${year}.${extension}`, { type: file.type });
  }

  getFileExtension(file: File): string {
    const extension = file.type.replace('image/', '');
    return extension;
  }
}
