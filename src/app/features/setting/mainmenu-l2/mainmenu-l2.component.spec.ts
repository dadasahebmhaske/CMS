import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainmenuL2Component } from './mainmenu-l2.component';

describe('MainmenuL2Component', () => {
  let component: MainmenuL2Component;
  let fixture: ComponentFixture<MainmenuL2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainmenuL2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainmenuL2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
