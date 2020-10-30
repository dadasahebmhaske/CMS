import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuL3Component } from './submenu-l3.component';

describe('SubmenuL3Component', () => {
  let component: SubmenuL3Component;
  let fixture: ComponentFixture<SubmenuL3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuL3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuL3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
