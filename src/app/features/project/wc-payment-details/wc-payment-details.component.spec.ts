import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcPaymentDetailsComponent } from './wc-payment-details.component';

describe('WcPaymentDetailsComponent', () => {
  let component: WcPaymentDetailsComponent;
  let fixture: ComponentFixture<WcPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
