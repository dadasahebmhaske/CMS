import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborRateComponent } from './labor-rate.component';

describe('LaborRateComponent', () => {
  let component: LaborRateComponent;
  let fixture: ComponentFixture<LaborRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaborRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
