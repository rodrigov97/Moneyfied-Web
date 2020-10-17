import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterIncomeComponent } from './form-register-income.component';

describe('FormRegisterComponent', () => {
  let component: FormRegisterIncomeComponent;
  let fixture: ComponentFixture<FormRegisterIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegisterIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegisterIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
