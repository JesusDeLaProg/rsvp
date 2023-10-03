import { Component, ChangeDetectorRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'rsvp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(MatExpansionPanel)
  panel?: MatExpansionPanel;

  private scrollCallback = () => this.changeDetector.detectChanges();

  constructor(protected changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollCallback);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollCallback);
  }

  get scrollY() {
    console.log(window.scrollY);
    return window.scrollY;
  }

}
