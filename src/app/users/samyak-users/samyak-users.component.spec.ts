import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamyakUsersComponent } from './samyak-users.component';

describe('SamyakUsersComponent', () => {
  let component: SamyakUsersComponent;
  let fixture: ComponentFixture<SamyakUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamyakUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamyakUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
