import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalGridComponent } from './goal-grid.component';

describe('GoalGridComponent', () => {
  let component: GoalGridComponent;
  let fixture: ComponentFixture<GoalGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
