import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMasterComponent } from './material-master.component';

describe('MaterialMasterComponent', () => {
  let component: MaterialMasterComponent;
  let fixture: ComponentFixture<MaterialMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
