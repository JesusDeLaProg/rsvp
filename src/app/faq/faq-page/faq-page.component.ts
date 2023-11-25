import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatAccordion, MatAccordionBase } from '@angular/material/expansion';

@Component({
  selector: 'rsvp-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
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
export class FaqPageComponent {
  @ViewChild(MatAccordion, { static: true }) accordion!: MatAccordionBase;

  email() {
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

  telephone() {
    return [
      3780,
      884,
      514
    ].reverse().join('-');
  }
}
