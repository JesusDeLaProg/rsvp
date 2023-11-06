import { Component, ChangeDetectorRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { NavigationStart, Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { PersonConfirmation } from './types/person-confirmation';
import { MatDialog } from '@angular/material/dialog';
import { SessionStartComponent } from './session-start/session-start.component';

@Component({
  selector: 'rsvp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(MatExpansionPanel)
  panel?: MatExpansionPanel;

  private subscriptions: Subscription[] = [];

  constructor(protected changeDetector: ChangeDetectorRef, private router: Router, private dialog: MatDialog) {
    this.startSession();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.panel?.close();
      }
    }));
  }

  ngOnDestroy(): void {
    for (const c of this.subscriptions) {
      c.unsubscribe();
    }
  }

  async startSession() {
    if (!sessionStorage.getItem('sessionStarted')) {
      if (localStorage.getItem('people')) {
        const dialogRef = this.dialog.open(SessionStartComponent);
        const result = await firstValueFrom(dialogRef.afterClosed());
        if (!result) {
          localStorage.setItem('people', '[{}]');
        }
      }
      sessionStorage.setItem('sessionStarted', 'true');
    }
    this.setUpLocalStorage();
  }

  setUpLocalStorage() {
    const params = (new URL(location.toString())).searchParams;
    if (params.has('person[]')) {
      const people = new Set(params.getAll('person[]'));
      const savedPeople = JSON.parse(localStorage.getItem('people') || '[]') as PersonConfirmation[];
      const peopleToSave: PersonConfirmation[] = [];
      for (const person of savedPeople) {
        if (person.name && people.has(person.name)) {
          peopleToSave.push(person);
          people.delete(person.name);
        }
      }
      for (const newPerson of people) {
        peopleToSave.push({ name: newPerson });
      }
      localStorage.setItem('people', JSON.stringify(peopleToSave));
    }
  }

}
