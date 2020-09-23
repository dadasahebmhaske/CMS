import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcInvoiceDetailsListComponent } from './wc-invoice-details-list.component';

describe('WcInvoiceDetailsListComponent', () => {
  let component: WcInvoiceDetailsListComponent;
  let fixture: ComponentFixture<WcInvoiceDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcInvoiceDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcInvoiceDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
