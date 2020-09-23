import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxationMasterComponent } from './taxation-master.component';

describe('TaxationMasterComponent', () => {
  let component: TaxationMasterComponent;
  let fixture: ComponentFixture<TaxationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
