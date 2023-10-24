import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'rsvp-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter, :leave', [
        animate(150)
      ])
    ])
  ]
})
export class FaqComponent {
  get email() {
    return [
      [
        'com',
        'gmail',
      ].reverse().join('.'),
      [
        'maxime',
        'charland'
      ].reverse().join('.')
    ].reverse().join('@');
  }

  get telephone() {
    return [
      3780,
      884,
      514
    ].reverse().join('-');
  }
}
