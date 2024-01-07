import { ApplicationRef, Injectable } from '@angular/core';
import { Subscription, filter, firstValueFrom } from 'rxjs';
import { UpdateReadyComponent } from './modals/update-ready/update-ready.component';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UpdateManagementService {

  updates$?: Subscription;
  updateChecking?: number;
  updateDialog?: MatDialogRef<UpdateReadyComponent>;

  constructor(
    private appref: ApplicationRef,
    private swUpdates: SwUpdate,
    private dialog: MatDialog
  ) {}

  async setup() {
    this.teardown();
    await firstValueFrom(this.appref.isStable.pipe(filter(isStable => isStable === true)));
    this.updateChecking = window.setInterval(async () => {
      if (await this.swUpdates.checkForUpdate()) {
        await this.showDialogIfNeeded();
      }
    }, 60 * 1000 /*1m*/);
    this.updates$ = this.swUpdates.versionUpdates.subscribe({
      next: async e => {
        console.log(e);
        if (e.type === 'VERSION_READY') {
          await this.showDialogIfNeeded();
        }
      }
    });
  }

  teardown() {
    this.updates$?.unsubscribe();
    this.updates$ = undefined;
    window.clearInterval(this.updateChecking);
    this.updateChecking = undefined;
    this.updateDialog?.close();
    this.updateDialog = undefined;
  }

  private async showDialogIfNeeded() {
    if (!this.updateDialog) {
      this.updateDialog = this.dialog.open(UpdateReadyComponent, { disableClose: true });
      await firstValueFrom(this.updateDialog.afterClosed());
      this.updateDialog = undefined;
    }
  }
}
