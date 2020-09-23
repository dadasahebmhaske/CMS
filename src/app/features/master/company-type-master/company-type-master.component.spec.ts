import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypeMasterComponent } from './company-type-master.component';

describe('CompanyTypeMasterComponent', () => {
  let component: CompanyTypeMasterComponent;
  let fixture: ComponentFixture<CompanyTypeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTypeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
