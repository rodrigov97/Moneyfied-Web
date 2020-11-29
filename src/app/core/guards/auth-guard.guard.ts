import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  UrlTree, CanActivate, Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  goingTo: string;

  constructor(
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    var currentUrl = this.router.url;

    if (currentUrl === '/login') {
      return this.loginToApp();
    }
    else if (currentUrl.includes('/app')) {
      return this.appToLogin();
    }
    else if (currentUrl === '/') {
      return this.anyToLogin();
    }

  }

  loginToApp(): boolean {
    if (this.isUserLogged !== true) {

      this.router.navigate(['login']);
    }
    return true;
  }

  appToLogin(): boolean {
    if (this.goingTo === 'login') {
      this.goingTo = '';
      return true;
    }
    if (!this.isUserLogged) {
      this.goingTo = 'login';
      this.router.navigate(['login']);
    }
    else if (this.isUserLogged) {
      return false
    }
    return true;
  }

  anyToLogin(): boolean {
    if (this.goingTo === 'app') {
      this.goingTo = '';
      return true;
    }
    if (this.goingTo === 'login') {
      this.goingTo = '';
      return true;
    }
    else if (!this.isUserLogged) {
      this.goingTo = 'login';
      this.router.navigate(['login']);
    }
    else if (this.isUserLogged) {
      this.goingTo = 'app';
      this.router.navigate(['app']);
    }
    return true;
  }

  get isUserLogged(): boolean {
    const userInfo = JSON.parse(localStorage.getItem('usuario'));
    return userInfo && userInfo.UsuarioId ? true : false;
  }
}
