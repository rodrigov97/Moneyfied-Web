import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MenuItem, MENUITEMS } from '../menu/menu.model';
import { ResponsiveService } from 'src/app/core/services/responsive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isMobile: boolean;

  hideMenu: boolean = false;

  constructor(
    private dataService: DataService,
    private route: Router,
    private responsiveService: ResponsiveService
  ) { }

  hideName: boolean = true;

  menuItems: MenuItem[] = MENUITEMS;

  ngOnInit(): void {
    this.dataService.currentToggleValue.subscribe(value => {
      this.hideMenu = value
    });

    this.onResize();
  }

  onResize(): void {
    this.responsiveService.checkWidth();
    this.isMobile = this.responsiveService.isMobile;
    this.dataService.toggleMenuView(!this.isMobile);
  }

  toggleMenu(): void {
    var toggleValue = !this.hideMenu;
    this.dataService.toggleMenuView(toggleValue);
  }
}
