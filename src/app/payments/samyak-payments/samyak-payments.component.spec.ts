import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamyakPaymentsComponent } from './samyak-payments.component';

describe('SamyakPaymentsComponent', () => {
  let component: SamyakPaymentsComponent;
  let fixture: ComponentFixture<SamyakPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamyakPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamyakPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
