import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreoComponent } from './choreo.component';

describe('ChoreoComponent', () => {
  let component: ChoreoComponent;
  let fixture: ComponentFixture<ChoreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
