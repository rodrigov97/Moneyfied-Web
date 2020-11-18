import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  toggleMenu: boolean = true;
  private toggleMenuValue = new BehaviorSubject<boolean>(this.toggleMenu);
  currentToggleValue = this.toggleMenuValue.asObservable();

  toggleSuccessDialog: any = { command: '' };
  private toggleSuccessDialogValue = new BehaviorSubject<any>(this.toggleSuccessDialog);
  currentToggleSuccessDialogValue = this.toggleSuccessDialogValue.asObservable();

  toggleWarningDialog: any = { command: '' };
  private toggleWarningDialogValue = new BehaviorSubject<any>(this.toggleWarningDialog);
  currentToggleWarningDialogValue = this.toggleWarningDialogValue.asObservable();

  toggleErrorDialog: any = { command: '' };
  private toggleErrorDialogValue = new BehaviorSubject<any>(this.toggleErrorDialog);
  currentToggleErrorDialogValue = this.toggleErrorDialogValue.asObservable();

  toggleTokenErrorDialog: any = { command: '' };
  private toggleTokenErrorDialogValue = new BehaviorSubject<any>(this.toggleTokenErrorDialog);
  currentToggleTokenErrorDialogValue = this.toggleTokenErrorDialogValue.asObservable();

  constructor() { }

  toggleMenuView(value: boolean): void {
    this.toggleMenuValue.next(value);
  }

  openSuccessDialogModal(value: any): void {
    this.toggleSuccessDialogValue.next(value);
  }

  openWarningDialogModal(value: any): void {
    this.toggleWarningDialogValue.next(value);
  }

  openErrorDialogModal(value: any): void {
    this.toggleErrorDialogValue.next(value);
  }

  openTokenErrorDialogModal(value: any): void {
    this.toggleTokenErrorDialogValue.next(value);
  }
}
