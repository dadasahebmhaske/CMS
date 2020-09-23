import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourContractListComponent } from './labour-contract-list.component';

describe('LabourContractListComponent', () => {
  let component: LabourContractListComponent;
  let fixture: ComponentFixture<LabourContractListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabourContractListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
