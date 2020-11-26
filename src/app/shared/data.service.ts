import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  toggleMenu: boolean = true;
  private toggleMenuValue = new BehaviorSubject<boolean>(this.toggleMenu);
  currentToggleValue = this.toggleMenuValue.asObservable();

  toggleHideItem: boolean = true;
  private toggleHideItemValue = new BehaviorSubject<boolean>(this.toggleHideItem);
  currentToggleHideItem = this.toggleHideItemValue.asObservable();

  toggleSuccessDialog = new Subject<any>();

  toggleWarningDialog = new Subject<any>();

  toggleErrorDialog = new Subject<any>();

  toggleTokenErrorDialog = new Subject<any>();

  toggleQuestionDialog = new Subject<any>();

  constructor() { }

  toggleMenuView(value: boolean): void {
    this.toggleMenuValue.next(value);
  }

  hideItemView(value: boolean): void {
    this.toggleHideItemValue.next(value);
  }

  openSuccessDialog(value: any): void {
    this.toggleSuccessDialog.next(value);
  }

  callOpenSuccessDialog(): Observable<any> {
    return this.toggleSuccessDialog.asObservable();
  }

  openWarningDialog(value: any): void {
    this.toggleWarningDialog.next(value);
  }

  callOpenWarningDialog(): Observable<any> {
    return this.toggleWarningDialog.asObservable();
  }

  openErrorDialog(value: any): void {
    this.toggleErrorDialog.next(value);
  }

  callOpenErrorDialog(): Observable<any> {
    return this.toggleErrorDialog.asObservable();
  }

  openTokenErrorDialog(value: any): void {
    this.toggleTokenErrorDialog.next(value);
  }

  callOpenTokenErrorDialog(): Observable<any> {
    return this.toggleTokenErrorDialog.asObservable();
  }

  openQuestionDialog(data: any): void {
    this.toggleQuestionDialog.next(data);
  }

  callOpenQuestionDialog(): Observable<any> {
    return this.toggleQuestionDialog.asObservable();
  }
}
