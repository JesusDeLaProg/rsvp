import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionStartComponent } from './session-start.component';

describe('SessionStartComponent', () => {
  let component: SessionStartComponent;
  let fixture: ComponentFixture<SessionStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionStartComponent]
    });
    fixture = TestBed.createComponent(SessionStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
