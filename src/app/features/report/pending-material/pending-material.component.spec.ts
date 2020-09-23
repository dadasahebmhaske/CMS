import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingMaterialComponent } from './pending-material.component';

describe('PendingMaterialComponent', () => {
  let component: PendingMaterialComponent;
  let fixture: ComponentFixture<PendingMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
