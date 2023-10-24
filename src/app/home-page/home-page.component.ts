import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'rsvp-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter, :leave', [
        animate(500)
      ])
    ])
  ]
})
export class HomePageComponent {

}
