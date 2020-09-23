import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourWorkPaymentDeatilsListComponent } from './labour-work-payment-deatils-list.component';

describe('LabourWorkPaymentDeatilsListComponent', () => {
  let component: LabourWorkPaymentDeatilsListComponent;
  let fixture: ComponentFixture<LabourWorkPaymentDeatilsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourWorkPaymentDeatilsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourWorkPaymentDeatilsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
