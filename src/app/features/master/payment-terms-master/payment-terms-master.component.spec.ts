import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTermsMasterComponent } from './payment-terms-master.component';

describe('PaymentTermsMasterComponent', () => {
  let component: PaymentTermsMasterComponent;
  let fixture: ComponentFixture<PaymentTermsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTermsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTermsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
