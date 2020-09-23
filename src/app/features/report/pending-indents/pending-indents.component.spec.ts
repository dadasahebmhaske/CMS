import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingIndentsComponent } from './pending-indents.component';

describe('PendingIndentsComponent', () => {
  let component: PendingIndentsComponent;
  let fixture: ComponentFixture<PendingIndentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingIndentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingIndentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
