import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcInvoiceDetailsComponent } from './wc-invoice-details.component';

describe('WcInvoiceDetailsComponent', () => {
  let component: WcInvoiceDetailsComponent;
  let fixture: ComponentFixture<WcInvoiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcInvoiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
