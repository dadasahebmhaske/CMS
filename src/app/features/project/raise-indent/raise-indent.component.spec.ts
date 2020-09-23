import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseIndentComponent } from './raise-indent.component';

describe('RaiseIndentComponent', () => {
  let component: RaiseIndentComponent;
  let fixture: ComponentFixture<RaiseIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
