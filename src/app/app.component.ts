import { Component, ChangeDetectorRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rsvp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(MatExpansionPanel)
  panel?: MatExpansionPanel;

  private scrollCallback = () => this.changeDetector.detectChanges();
  private subscriptions: Subscription[] = [];

  constructor(protected changeDetector: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollCallback);
    this.subscriptions.push(this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.panel?.close();
      }
    }));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollCallback);
    for(const c of this.subscriptions) {
      c.unsubscribe();
    }
  }

  get scrollY() {
    console.log(window.scrollY);
    return window.scrollY;
  }

}
