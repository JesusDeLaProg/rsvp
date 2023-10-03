import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultHomeComponent } from './default-home.component';

describe('DefaultHomeComponent', () => {
  let component: DefaultHomeComponent;
  let fixture: ComponentFixture<DefaultHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultHomeComponent]
    });
    fixture = TestBed.createComponent(DefaultHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'marriage-rsvp'`, () => {
    const fixture = TestBed.createComponent(DefaultHomeComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('marriage-rsvp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(DefaultHomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('marriage-rsvp app is running!');
  });
});
