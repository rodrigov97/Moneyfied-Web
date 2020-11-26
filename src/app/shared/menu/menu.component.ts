import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MENUITEMS, MenuItem } from './menu.model';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  toggleMenu: boolean;
  isMobile: boolean;

  hideName: boolean;

  menuItems: MenuItem[] = MENUITEMS;

  selectedItem: string = 'Dashboard';

  logoutCallback: Subscription;

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

    this.dataService.currentToggleHideItem.subscribe(value => {
      if (!this.isMobile)
        this.hideName = value
    });
  }

  onResize(): void {
    this.responsiveService.checkWidth();
    this.isMobile = this.responsiveService.isMobile;
    if (this.isMobile)
      this.hideName = false;
  }

  hideItemName(): void {
    this.hideName = !this.hideName;
    this.dataService.hideItemView(this.hideName);
    window.dispatchEvent(new Event('resize'));
  }

  selectItem(itemName: string, url: string) {
    this.selectedItem = itemName;

    if (this.isMobile)
      this.toggleMenu = false;

    this.hideName = true;
    this.dataService.hideItemView(this.hideName);

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
    this.dataService.openQuestionDialog({
      command: 'open',
      title: 'Atenção',
      question: 'Deseja mesmo sair ?',
      callback: this.onLogout,
      extras: this.route
    });
  }

  onLogout(value: boolean, extras: any, sub: Subscription): void {
    if (value) {
      sub.unsubscribe();
      localStorage.clear();
      extras.navigate(['login']);
    }
  }
}
