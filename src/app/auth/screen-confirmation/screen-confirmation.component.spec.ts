import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenConfirmationComponent } from './screen-confirmation.component';

describe('ScreenConfirmationComponent', () => {
  let component: ScreenConfirmationComponent;
  let fixture: ComponentFixture<ScreenConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
