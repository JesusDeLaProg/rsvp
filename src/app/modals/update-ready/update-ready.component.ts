import { Component } from '@angular/core';

@Component({
  selector: 'rsvp-update-ready',
  templateUrl: './update-ready.component.html',
  styleUrls: ['./update-ready.component.scss']
})
export class UpdateReadyComponent {

  refresh() {
    location.reload();
  }
}
