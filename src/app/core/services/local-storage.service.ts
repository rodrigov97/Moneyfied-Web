import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addToken(token: string): void {
    localStorage.setItem('token', token);
  }

  get userToken(): string {
    return localStorage.getItem('token');
  }

  addUser(user: JSON): void {
    const userInfo = JSON.stringify(user);
    localStorage.setItem('usuario', userInfo);
  }

  get userInfo(): Usuario {
    const userInfo = JSON.parse(localStorage.getItem('usuario'));
    return new Usuario(userInfo);
  }
}
