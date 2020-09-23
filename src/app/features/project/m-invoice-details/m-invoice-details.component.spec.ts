import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MInvoiceDetailsComponent } from './m-invoice-details.component';

describe('MInvoiceDetailsComponent', () => {
  let component: MInvoiceDetailsComponent;
  let fixture: ComponentFixture<MInvoiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MInvoiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
