import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPayoutListComponent } from './weekly-payout-list.component';

describe('WeeklyPayoutListComponent', () => {
  let component: WeeklyPayoutListComponent;
  let fixture: ComponentFixture<WeeklyPayoutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyPayoutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyPayoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
