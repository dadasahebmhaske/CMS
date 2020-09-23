import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPayoutComponent } from './weekly-payout.component';

describe('WeeklyPayoutComponent', () => {
  let component: WeeklyPayoutComponent;
  let fixture: ComponentFixture<WeeklyPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
