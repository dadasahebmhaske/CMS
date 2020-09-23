import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborRateMasterComponent } from './labor-rate-master.component';

describe('LaborRateMasterComponent', () => {
  let component: LaborRateMasterComponent;
  let fixture: ComponentFixture<LaborRateMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaborRateMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborRateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
