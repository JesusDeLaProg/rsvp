import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonConfirmation } from '../types/person-confirmation';

@Component({
  selector: 'rsvp-confirmation-confirmation',
  templateUrl: './confirmation-confirmation.component.html',
  styleUrls: ['./confirmation-confirmation.component.scss']
})
export class ConfirmationConfirmationComponent {

  get presentSuccesses() {
    return this.data.successes.filter(p => p.present);
  }

  get absentSuccesses() {
    return this.data.successes.filter(p => !p.present);
  }

  get failureNames() {
    return this.data.failures.map(p => p.person.name);
  }

  get email() {
    return [
      [
        'com',
        'gmail',
      ].reverse().join('.'),
      [
        'maxime',
        'charland'
      ].reverse().join('.')
    ].reverse().join('@');
  }

  get telephone() {
    return [
      3780,
      884,
      514
    ].reverse().join('-');
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: { successes: PersonConfirmation[], failures: { person: PersonConfirmation, error: any }[] }) {}

  getFoodChoiceLabel(person: PersonConfirmation) {
    switch (person.foodChoice) {
      case 0:
        return 'Volaille';
      case 1:
        return 'Saumon';
      case 2:
        return 'Végétarien';
    }
    return 'Aucun';
  }

  someHasAllergy() {
    return this.presentSuccesses.some(p => !!p.allergy);
  }
}
