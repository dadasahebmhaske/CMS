import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTermsMasterComponent } from './delivery-terms-master.component';

describe('DeliveryTermsMasterComponent', () => {
  let component: DeliveryTermsMasterComponent;
  let fixture: ComponentFixture<DeliveryTermsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryTermsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryTermsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
