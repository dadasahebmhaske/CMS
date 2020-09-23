import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePoListComponent } from './generate-po-list.component';

describe('GeneratePoListComponent', () => {
  let component: GeneratePoListComponent;
  let fixture: ComponentFixture<GeneratePoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
