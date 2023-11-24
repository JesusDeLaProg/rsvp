import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationConfirmationComponent } from './confirmation-confirmation.component';

describe('ConfirmationConfirmationComponent', () => {
  let component: ConfirmationConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationConfirmationComponent]
    });
    fixture = TestBed.createComponent(ConfirmationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
