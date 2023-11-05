import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonConfirmation } from '../types/person-confirmation';

@Component({
  selector: 'rsvp-confirmation-confirmation',
  templateUrl: './confirmation-confirmation.component.html',
  styleUrls: ['./confirmation-confirmation.component.scss']
})
export class ConfirmationConfirmationComponent {

  presentPeople: PersonConfirmation[] = [];
  absentPeople: PersonConfirmation[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) people: PersonConfirmation[]) {
    for (const p of people) {
      if (p.present) {
        this.presentPeople.push(p);
      } else {
        this.absentPeople.push(p);
      }
    }
  }

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
    return this.presentPeople.some(p => !!p.allergy);
  }
}
