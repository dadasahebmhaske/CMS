import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwPaymentDetailsComponent } from './dw-payment-details.component';

describe('DwPaymentDetailsComponent', () => {
  let component: DwPaymentDetailsComponent;
  let fixture: ComponentFixture<DwPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
