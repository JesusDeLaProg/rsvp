import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ConfirmationPersonCardComponent } from '../confirmation-person-card/confirmation-person-card.component';
import { PersonConfirmation } from '../types/person-confirmation';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationConfirmationComponent } from '../confirmation-confirmation/confirmation-confirmation.component';

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
export class ConfirmationPageComponent implements OnInit {
  @ViewChildren(ConfirmationPersonCardComponent)
  rsvps?: QueryList<ConfirmationPersonCardComponent>;

  _people: PersonConfirmation[] = [];
  get people() {
    const savedPeople = this.getPeople();
    if (this._people.length !== savedPeople.length) {
      this._people = savedPeople;
    } else {
      for (const pair of savedPeople.map((p, i) => [p, this._people[i]])) {
        if (pair[0].name !== pair[1].name || pair[0].present !== pair[1].present || pair[0].foodChoice !== pair[1].foodChoice) {
          this._people = savedPeople;
          break;
        }
      }
    }
    return this._people;
  }

  get isReadyToSubmit() {
    return !!this.rsvps && !this.rsvps.find(r => !r.isReadyToSubmit);
  }

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this._people = this.getPeople();
    if (this._people.length === 0) {
      this._people.push({});
      localStorage.setItem('people', JSON.stringify(this._people));
    }
  }

  getPeople(): PersonConfirmation[] {
    const p = localStorage.getItem('people');
    if (p) {
      try {
        return JSON.parse(p || '[]');
      } catch (e) {
        return [];
      }
    } else {
      return [];
    }
  }

  addPerson() {
    this._people.push({});
    localStorage.setItem('people', JSON.stringify(this._people));
  }

  removePerson(index: number) {
    this._people.splice(index, 1);
    localStorage.setItem('people', JSON.stringify(this._people));
  }

  updatePerson(index: number, person: PersonConfirmation) {
    Object.assign(this._people[index], person);
    localStorage.setItem('people', JSON.stringify(this._people));
  }

  confirm() {
    if (this.isReadyToSubmit) {
      this.matDialog.open(ConfirmationConfirmationComponent, { data: this._people });
      alert(`Confirmation:\n${this.getPeople().map(p => JSON.stringify(p)).join('\n')}`);
    }
  }
}
