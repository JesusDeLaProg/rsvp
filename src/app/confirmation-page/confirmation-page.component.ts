import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rsvp-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter, :leave', [
        animate(200)
      ])
    ]),
    trigger('fadeRotate', [
      state('void', style({ opacity: 0, transform: 'rotateZ(90deg)' })),
      state('*', style({ opacity: 1, transform: 'rotateZ(0)' })),
      transition(':enter, :leave', [
        animate(200)
      ])
    ]),
    trigger('fadeCounterRotate', [
      state('void', style({ opacity: 0, transform: 'rotateZ(-90deg)' })),
      state('*', style({ opacity: 1, transform: 'rotateZ(0)' })),
      transition(':enter, :leave', [
        animate(200)
      ])
    ]),
  ]
})
export class ConfirmationPageComponent implements OnInit {
  person1: string = "";
  person2: string = "";

  ngOnInit(): void {
    this.person1 = window.sessionStorage.getItem('person1') || '';
    this.person2 = window.sessionStorage.getItem('person2') || '';
  }
}
