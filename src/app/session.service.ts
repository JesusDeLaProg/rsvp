import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { SessionStartComponent } from './modals/session-start/session-start.component';
import { PersonConfirmation } from './types/person-confirmation';

function symDiff<T>(set1: Set<T>, set2: Set<T>): boolean {
  const res: T[] = [];
  for (const v of set1.values()) {
    if (!set2.has(v)) {
      return true;
    }
  }
  for (const v of set2.values()) {
    if (!set1.has(v)) {
      return true;
    }
  }
  return false;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private get urlPeople(): string[] {
    const res: string[] = [];
    for (const n of (new URL(location.toString())).searchParams.getAll('person[]')) {
      const name = n === 'Émenauelle Lajoie' ? 'Emmanuelle Lajoie' : n;
      if (res.includes(name)) {
        res.push(`Accompagnateur.rice (${name})`);
      } else {
        res.push(name);
      }
    }
    return res;
  }

  private get savedPeople(): string[] {
    try {
      return (JSON.parse(localStorage.getItem('people') || '[]') as PersonConfirmation[])
          .filter(p => !!p.name).map(p => p.name as string);
    } catch {
      return [];
    }
  }

  constructor(private dialog: MatDialog) { }

  async startSession() {
    if (this.urlPeople.length > 0 && symDiff(new Set(this.savedPeople), new Set(this.urlPeople))) {
      if (localStorage.getItem('people')) { // Already started, url different, ask for restart
        const dialogRef = this.dialog.open(SessionStartComponent, { disableClose: true });
        const result = await firstValueFrom(dialogRef.afterClosed());
        if (result) {  // Continue
          return;
        } else {  // Restart
          localStorage.setItem('people',
            JSON.stringify(
              [...this.urlPeople.values()].map(n => ({ name: n } as PersonConfirmation))
            )
          );
        }
      } else { // First app startup
        localStorage.setItem('people',
          JSON.stringify(
            [...this.urlPeople.values()].map(n => ({ name: n } as PersonConfirmation))
          )
        );
      }
    }
  }
}
