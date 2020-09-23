import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwPaymentDetailsListComponent } from './dw-payment-details-list.component';

describe('DwPaymentDetailsListComponent', () => {
  let component: DwPaymentDetailsListComponent;
  let fixture: ComponentFixture<DwPaymentDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwPaymentDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwPaymentDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
