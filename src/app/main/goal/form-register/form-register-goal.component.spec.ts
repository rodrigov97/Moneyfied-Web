import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterGoalComponent } from './form-register-goal.component';

describe('FormRegisterGoalComponent', () => {
  let component: FormRegisterGoalComponent;
  let fixture: ComponentFixture<FormRegisterGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegisterGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegisterGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
