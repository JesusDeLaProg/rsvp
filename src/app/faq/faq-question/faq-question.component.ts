import { Component, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { MatAccordionBase, MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { SecretLinkComponent } from 'src/app/secret-link/secret-link.component';

@Component({
  selector: 'rsvp-faq-question',
  templateUrl: './faq-question.component.html',
  styleUrls: ['./faq-question.component.scss']
})
export class FaqQuestionComponent {
  @Input({ required: true }) question!: string;
  @Input() accordion?: MatAccordionBase;
  @ViewChild(MatExpansionPanel, { static: true }) panel!: MatExpansionPanel;
  @ContentChildren(SecretLinkComponent, { descendants: true }) secretLinks?: QueryList<SecretLinkComponent>;

  $panelExpanded?: Subscription;

  ngOnInit(): void {
    this.$panelExpanded = this.panel.expandedChange.subscribe(
      (open) => this.secretLinks?.forEach(l => l.hidden = !open)
    );
    if (this.accordion) {
      this.panel.accordion = this.accordion;
    }
  }

  ngOnDestroy(): void {
    if (this.$panelExpanded) {
      this.$panelExpanded.unsubscribe();
    }
  }
}
