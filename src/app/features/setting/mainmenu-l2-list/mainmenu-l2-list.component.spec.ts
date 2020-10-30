import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainmenuL2ListComponent } from './mainmenu-l2-list.component';

describe('MainmenuL2ListComponent', () => {
  let component: MainmenuL2ListComponent;
  let fixture: ComponentFixture<MainmenuL2ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainmenuL2ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainmenuL2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
