import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rsvp-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
export class ConfirmationPageComponent {
  person1: string = "";
  person2: string = "";

  constructor(route: ActivatedRoute) {
    const params = route.snapshot.queryParamMap;
    this.person1 = params.get('person1') || '';
    this.person2 = params.get('person2') || '';
  }
}
