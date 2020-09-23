import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTermsComponent } from './delivery-terms.component';

describe('DeliveryTermsComponent', () => {
  let component: DeliveryTermsComponent;
  let fixture: ComponentFixture<DeliveryTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
