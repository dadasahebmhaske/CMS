import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIssueSlipComponent } from './material-issue-slip.component';

describe('MaterialIssueSlipComponent', () => {
  let component: MaterialIssueSlipComponent;
  let fixture: ComponentFixture<MaterialIssueSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialIssueSlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIssueSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
