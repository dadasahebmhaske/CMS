import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourWorkPaymentDeatilsComponent } from './labour-work-payment-deatils.component';

describe('LabourWorkPaymentDeatilsComponent', () => {
  let component: LabourWorkPaymentDeatilsComponent;
  let fixture: ComponentFixture<LabourWorkPaymentDeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourWorkPaymentDeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourWorkPaymentDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
