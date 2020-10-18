import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamyakEventsComponent } from './samyak-events.component';

describe('SamyakEventsComponent', () => {
  let component: SamyakEventsComponent;
  let fixture: ComponentFixture<SamyakEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamyakEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamyakEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
