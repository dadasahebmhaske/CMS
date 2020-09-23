import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOfMeasurementMasterComponent } from './unit-of-measurement-master.component';

describe('UnitOfMeasurementMasterComponent', () => {
  let component: UnitOfMeasurementMasterComponent;
  let fixture: ComponentFixture<UnitOfMeasurementMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitOfMeasurementMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfMeasurementMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
