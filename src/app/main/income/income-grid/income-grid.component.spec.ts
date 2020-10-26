import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeGridComponent } from './income-grid.component';

describe('IncomeGridComponent', () => {
  let component: IncomeGridComponent;
  let fixture: ComponentFixture<IncomeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
