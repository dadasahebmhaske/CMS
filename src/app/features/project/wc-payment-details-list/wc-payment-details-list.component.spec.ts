import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcPaymentDetailsListComponent } from './wc-payment-details-list.component';

describe('WcPaymentDetailsListComponent', () => {
  let component: WcPaymentDetailsListComponent;
  let fixture: ComponentFixture<WcPaymentDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcPaymentDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcPaymentDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
