import { Injectable } from '@angular/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { UpdateReadyComponent } from './modals/update-ready/update-ready.component';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UpdateManagementService {

  updates$?: Subscription;

  constructor(
    private swUpdates: SwUpdate,
    private dialog: MatDialog
  ) {}

  setup() {
    this.teardown();
    this.updates$ = this.swUpdates.versionUpdates.subscribe({
      next: async e => {
        console.log(e);
        if (e.type === 'VERSION_READY') {
          const ref = this.dialog.open(UpdateReadyComponent);
          await firstValueFrom(ref.afterClosed());
        }
      }
    });
  }

  teardown() {
    this.updates$?.unsubscribe();
    this.updates$ = undefined;
  }
}
