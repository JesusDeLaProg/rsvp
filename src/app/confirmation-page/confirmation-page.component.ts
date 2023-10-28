import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { ConfirmationPersonCardComponent, PersonConfirmation } from '../confirmation-person-card/confirmation-person-card.component';

@Component({
  selector: 'rsvp-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter, :leave', [
        animate(200)
      ])
    ]),
    trigger('fadeRotate', [
      state('void', style({ opacity: 0, transform: 'rotateZ(90deg)' })),
      state('*', style({ opacity: 1, transform: 'rotateZ(0)' })),
      transition(':enter, :leave', [
        animate(200)
      ])
    ]),
    trigger('fadeCounterRotate', [
      state('void', style({ opacity: 0, transform: 'rotateZ(-90deg)' })),
      state('*', style({ opacity: 1, transform: 'rotateZ(0)' })),
      transition(':enter, :leave', [
        animate(200)
      ])
    ]),
  ]
})
export class ConfirmationPageComponent {
  @ViewChild('rsvp1')
  rsvp1?: ConfirmationPersonCardComponent;
  @ViewChild('rsvp2')
  rsvp2?: ConfirmationPersonCardComponent;

  get person1(): PersonConfirmation {
    return this.getPerson('person1');
  }
  set person1(v: PersonConfirmation) {
    sessionStorage.setItem('person1', JSON.stringify(v));
  }
  get person2() {
    return this.getPerson('person2');
  }
  set person2(v: PersonConfirmation) {
    if (this.rsvp2?.hidden) {
      sessionStorage.removeItem('person2');
    }
    sessionStorage.setItem('person2', JSON.stringify(v));
  }

  getPerson(key: string): PersonConfirmation {
    const p = sessionStorage.getItem(key);
    if (p) {
      try {
        return JSON.parse(p);
      } catch (e) {
        return {};
      }
    } else {
      return {};
    }
  }

  confirm() {
    if (this.rsvp1?.isReadyToSubmit && (this.rsvp2?.hidden || this.rsvp2?.isReadyToSubmit)) {
      if (this.rsvp2.hidden) {
        alert(`Confirmation:\n${JSON.stringify(this.getPerson('person1'))}`);
      } else {
        alert(`Confirmation:\n${JSON.stringify(this.getPerson('person1'))}\n${JSON.stringify(this.getPerson('person2'))}`);
      }
    }
  }
}
