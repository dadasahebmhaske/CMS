import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPoComponent } from './pending-po.component';

describe('PendingPoComponent', () => {
  let component: PendingPoComponent;
  let fixture: ComponentFixture<PendingPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
