import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIssueSlipListComponent } from './material-issue-slip-list.component';

describe('MaterialIssueSlipListComponent', () => {
  let component: MaterialIssueSlipListComponent;
  let fixture: ComponentFixture<MaterialIssueSlipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialIssueSlipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIssueSlipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
