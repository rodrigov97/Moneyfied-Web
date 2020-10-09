import { Injectable } from '@angular/core';

@Injectable()
export class ResponsiveService {

  public isMobile: boolean;
  public screenWidth: string;

  constructor() {
    this.checkWidth();
  }

  checkMobile(status: boolean): boolean {
    return this.isMobile = status;
  }

  public checkWidth() {
    var width = window.innerWidth;
    if (width <= 768) {
      this.screenWidth = 'sm';
      this.checkMobile(true);
    } else if (width > 768 && width <= 992) {
      this.screenWidth = 'md';
      this.checkMobile(false);
    } else {
      this.screenWidth = 'lg';
      this.checkMobile(false);
    }
  }

}
