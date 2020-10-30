import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuL3ListComponent } from './submenu-l3-list.component';

describe('SubmenuL3ListComponent', () => {
  let component: SubmenuL3ListComponent;
  let fixture: ComponentFixture<SubmenuL3ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuL3ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuL3ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
