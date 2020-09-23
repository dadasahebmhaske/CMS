import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePoComponent } from './generate-po.component';

describe('GeneratePoComponent', () => {
  let component: GeneratePoComponent;
  let fixture: ComponentFixture<GeneratePoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
