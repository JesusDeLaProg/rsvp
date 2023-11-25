import { Component, Input } from '@angular/core';

@Component({
  selector: 'rsvp-secret-link',
  templateUrl: './secret-link.component.html',
  styleUrls: ['./secret-link.component.scss']
})
export class SecretLinkComponent {
  @Input() scheme?: string;
  @Input({ required: true }) link!: () => string;

  hidden = true;
}
