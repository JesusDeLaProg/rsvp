import { Component, ChangeDetectorRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { NavigationStart, Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { SessionService } from './session.service';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { UpdateReadyComponent } from './modals/update-ready/update-ready.component';
import { UpdateManagementService } from './update-management.service';

@Component({
  selector: 'rsvp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(MatExpansionPanel, { static: true })
  panel!: MatExpansionPanel;

  navigations$?: Subscription;

  constructor(
    protected changeDetector: ChangeDetectorRef,
    private router: Router,
    private updateManager: UpdateManagementService,
    sessionManager: SessionService) {
    updateManager.setup();
    sessionManager.startSession();
  }

  ngOnInit(): void {
    this.navigations$ = this.router.events.subscribe({
      next: e => {
        if (e instanceof NavigationStart) {
          this.panel.close();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.updateManager.teardown();
    this.navigations$?.unsubscribe();
  }

}
