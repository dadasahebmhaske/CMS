import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MInvoiceDetailsListComponent } from './m-invoice-details-list.component';

describe('MInvoiceDetailsListComponent', () => {
  let component: MInvoiceDetailsListComponent;
  let fixture: ComponentFixture<MInvoiceDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MInvoiceDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MInvoiceDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
