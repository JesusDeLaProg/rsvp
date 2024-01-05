import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReadyComponent } from './update-ready.component';

describe('UpdateReadyComponent', () => {
  let component: UpdateReadyComponent;
  let fixture: ComponentFixture<UpdateReadyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateReadyComponent]
    });
    fixture = TestBed.createComponent(UpdateReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
