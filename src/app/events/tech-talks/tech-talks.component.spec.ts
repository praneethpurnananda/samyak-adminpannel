import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTalksComponent } from './tech-talks.component';

describe('TechTalksComponent', () => {
  let component: TechTalksComponent;
  let fixture: ComponentFixture<TechTalksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechTalksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTalksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
