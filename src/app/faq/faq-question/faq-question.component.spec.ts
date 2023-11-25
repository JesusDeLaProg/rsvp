import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqQuestionComponent } from './faq-question.component';

describe('FaqQuestionComponent', () => {
  let component: FaqQuestionComponent;
  let fixture: ComponentFixture<FaqQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqQuestionComponent]
    });
    fixture = TestBed.createComponent(FaqQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
