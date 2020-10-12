import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MENUITEMS, LOGOUT, MenuItem } from './menu.model';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  toggleMenu: boolean;
  isMobile: boolean;

  hideName: boolean = true;

  menuItems: MenuItem[] = MENUITEMS;
  logout: MenuItem = LOGOUT;

  selectedItem: string = 'Dashboard';

  constructor(
    private dataService: DataService,
    private route: Router,
    private responsiveService: ResponsiveService
  ) { }

  ngOnInit(): void {
    this.onResize();

    this.dataService.currentToggleValue.subscribe(value => {
      this.toggleMenu = value
    });
  }

  onResize(): void {
    this.responsiveService.checkWidth();
    this.isMobile = this.responsiveService.isMobile;
    if(this.isMobile) {
      this.hideName = false;
    }
  }

  hideItemName(): void {
    this.hideName = !this.hideName;
    window.dispatchEvent(new Event('resize'));
  }

  selectItem(itemName: string, url: string) {
    this.selectedItem = itemName;

    this.route.navigate(['app', url]);
  }

  setBackgroundStyle(itemName: string, color: string): any {
    if (itemName === this.selectedItem) {
      return {
        'background-color': `${color}`
      }
    }
  }

  setColorStyle(itemName: string, color: string): any {
    if (itemName === this.selectedItem) {
      return {
        'color': `${color}`
      }
    }
  }

  logoutUser(): void {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
