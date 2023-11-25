import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ConfirmationPersonCardComponent } from '../confirmation-person-card/confirmation-person-card.component';
import { PersonConfirmation } from '../../types/person-confirmation';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationConfirmationComponent } from '../../modals/confirmation-confirmation/confirmation-confirmation.component';
import { CollectionReference, Firestore, addDoc, collection } from '@angular/fire/firestore';

type PersonConfirmationWithTimestamp = PersonConfirmation & { timestamp: Date };

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
export class ConfirmationPageComponent implements OnInit, AfterViewInit {
  @ViewChildren(ConfirmationPersonCardComponent)
  rsvps?: QueryList<ConfirmationPersonCardComponent>;

  confirmationCollection: CollectionReference<PersonConfirmationWithTimestamp>;

  _people: PersonConfirmation[] = [];
  get people() {
    const savedPeople = this.getPeople();
    if (this._people.length !== savedPeople.length) {
      this._people = savedPeople;
    } else {
      for (const pair of savedPeople.map((p, i) => [p, this._people[i]])) {
        if (pair[0].name !== pair[1].name || pair[0].present !== pair[1].present ||
          pair[0].foodChoice !== pair[1].foodChoice || pair[0].allergy !== pair[1].allergy ||
          pair[0].email !== pair[1].email) {
          this._people = savedPeople;
          break;
        }
      }
    }
    return this._people;
  }

  _initialized = false;
  get isReadyToSubmit() {
    return this._initialized && !!this.rsvps && !this.rsvps.find(r => !r.isReadyToSubmit);
  }

  constructor(private matDialog: MatDialog, firestore: Firestore) {
    this.confirmationCollection = collection(firestore, 'confirmations') as CollectionReference<PersonConfirmationWithTimestamp, PersonConfirmationWithTimestamp>;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this._initialized = true);
  }

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

  async confirm() {
    if (this.isReadyToSubmit) {
      const result = await Promise.allSettled(this._people.map(p => addDoc(this.confirmationCollection, { ...p, timestamp: new Date() })));
      const successes: PersonConfirmation[] = [];
      const failures: {person: PersonConfirmation, error: any}[] = [];
      for (let i = 0; i < result.length; ++i) {
        const r = result[i];
        if (r.status === 'fulfilled') {
          successes.push(this._people[i]);
        } else {
          failures.push({ person: this._people[i], error: r.reason });
        }
      }
      this.matDialog.open(ConfirmationConfirmationComponent, { data: { successes, failures } });
    }
  }
}
