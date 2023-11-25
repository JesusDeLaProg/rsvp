import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { SessionStartComponent } from './modals/session-start/session-start.component';
import { PersonConfirmation } from './types/person-confirmation';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private dialog: MatDialog) {}

  async startSession() {
    if (!sessionStorage.getItem('sessionStarted')) {
      if (localStorage.getItem('people')) {
        const dialogRef = this.dialog.open(SessionStartComponent, { disableClose: true });
        const result = await firstValueFrom(dialogRef.afterClosed());
        if (!result) {
          localStorage.removeItem('people');
        }
      }
      sessionStorage.setItem('sessionStarted', 'true');
    }
    this.setUpLocalStorageFromCurrentUrl();
  }

  private setUpLocalStorageFromCurrentUrl() {
    const params = (new URL(location.toString())).searchParams;
    if (params.has('person[]')) {
      const people = new Set(params.getAll('person[]'));
      const savedPeople = JSON.parse(localStorage.getItem('people') || '[]') as PersonConfirmation[];
      localStorage.setItem('people', JSON.stringify([
        ...savedPeople.filter(p => p.name && people.has(p.name)),
        ...[...people.keys()].map(name => ({ name }))
      ]));
    }
  }
}
