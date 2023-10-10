import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPersonCardComponent } from './confirmation-person-card.component';

describe('ConfirmationPersonCardComponent', () => {
  let component: ConfirmationPersonCardComponent;
  let fixture: ComponentFixture<ConfirmationPersonCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationPersonCardComponent]
    });
    fixture = TestBed.createComponent(ConfirmationPersonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
