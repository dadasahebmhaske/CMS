import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTypeMasterComponent } from './material-type-master.component';

describe('MaterialTypeMasterComponent', () => {
  let component: MaterialTypeMasterComponent;
  let fixture: ComponentFixture<MaterialTypeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTypeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
