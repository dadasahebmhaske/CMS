import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseIndentListComponent } from './raise-indent-list.component';

describe('RaiseIndentListComponent', () => {
  let component: RaiseIndentListComponent;
  let fixture: ComponentFixture<RaiseIndentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseIndentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseIndentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
