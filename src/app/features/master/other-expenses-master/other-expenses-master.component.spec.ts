import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherExpensesMasterComponent } from './other-expenses-master.component';

describe('OtherExpensesMasterComponent', () => {
  let component: OtherExpensesMasterComponent;
  let fixture: ComponentFixture<OtherExpensesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherExpensesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherExpensesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
