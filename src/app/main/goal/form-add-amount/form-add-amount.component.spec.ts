import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddAmountComponent } from './form-add-amount.component';

describe('FormAddAmountComponent', () => {
  let component: FormAddAmountComponent;
  let fixture: ComponentFixture<FormAddAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
