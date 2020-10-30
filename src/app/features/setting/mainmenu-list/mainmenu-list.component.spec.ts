import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainmenuListComponent } from './mainmenu-list.component';

describe('MainmenuListComponent', () => {
  let component: MainmenuListComponent;
  let fixture: ComponentFixture<MainmenuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainmenuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainmenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
