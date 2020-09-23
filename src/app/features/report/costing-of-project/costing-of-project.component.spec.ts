import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostingOfProjectComponent } from './costing-of-project.component';

describe('CostingOfProjectComponent', () => {
  let component: CostingOfProjectComponent;
  let fixture: ComponentFixture<CostingOfProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostingOfProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostingOfProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
