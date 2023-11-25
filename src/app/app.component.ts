import { Component, ChangeDetectorRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from './session.service';

@Component({
  selector: 'rsvp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(MatExpansionPanel, { static: true })
  panel!: MatExpansionPanel;

  $navigations?: Subscription;

  constructor(
    protected changeDetector: ChangeDetectorRef,
    private router: Router,
    sessionManager: SessionService) {
    sessionManager.startSession();
  }

  ngOnInit(): void {
    this.$navigations = this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.panel.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.$navigations?.unsubscribe();
  }

}
