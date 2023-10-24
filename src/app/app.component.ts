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

  private subscriptions: Subscription[] = [];

  constructor(protected changeDetector: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.panel?.close();
        const params = (new URL(e.url, document.baseURI)).searchParams;
        if (params && (params.has('person1') || params.has('person2'))) {
          const person1 = params.get('person1') || params.get('person2');
          const person2 = params.get('person2');
          sessionStorage.clear();
          if (person1) {
            sessionStorage.setItem('person1', person1);
          }
          if (person2) {
            sessionStorage.setItem('person2', person2);
          }
        }
      }
    }));
  }

  ngOnDestroy(): void {
    for(const c of this.subscriptions) {
      c.unsubscribe();
    }
  }

}
