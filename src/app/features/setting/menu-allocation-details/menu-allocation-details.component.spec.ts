import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAllocationDetailsComponent } from './menu-allocation-details.component';

describe('MenuAllocationDetailsComponent', () => {
  let component: MenuAllocationDetailsComponent;
  let fixture: ComponentFixture<MenuAllocationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAllocationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAllocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
