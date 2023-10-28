import { Component, ViewChild, Input, OnInit, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FoodMenuComponent } from '../food-menu/food-menu.component';
import { firstValueFrom } from 'rxjs';

export interface PersonConfirmation {
  name?: string;
  present?: boolean;
  foodChoice?: number;
}

@Component({
  selector: 'rsvp-confirmation-person-card',
  templateUrl: './confirmation-person-card.component.html',
  styleUrls: ['./confirmation-person-card.component.scss']
})
export class ConfirmationPersonCardComponent {

  @Input() hideable: boolean = false;

  @ViewChild(MatExpansionPanel)
  panel?: MatExpansionPanel;

  personConfirmation: PersonConfirmation = {};
  @Input()
  set confirmation(p: PersonConfirmation) {
    if (p !== null &&
      (p.name !== this.personConfirmation.name
        || p.present !== this.personConfirmation.present
        || p.foodChoice !== this.personConfirmation.foodChoice)) {
      this.personConfirmation = p;
      this.personNameControl.setValue(p.name || '');
      this.presenceChanged(this.personConfirmation.present ?? false);
    }
  }
  @Output()
  confirmationChange = new EventEmitter<PersonConfirmation>();

  private editingName_ = false;
  get editingName() { return this.editingName_; }
  set editingName(b: boolean) {
    if (!(this.editingName_ = b)) {
      this.personConfirmation.name = this.personNameControl.value || '';
      this.confirmationChange.emit(this.personConfirmation);
    }
  }

  hidden_ = false;
  get hidden() { return this.hidden_; }
  set hidden(b: boolean) {
    this.hidden_ = b;
    this.confirmationChange.emit(this.personConfirmation);
  }

  personNameControl = new FormControl<string>('', [Validators.required,
  (c: AbstractControl<string>) => {
    const parts = c.value.split(' ');
    if (parts.every(s => !!s) && parts.length >= 2) {
      return {};
    } else {
      return { completeName: true };
    }
  }]);

  get isReadyToSubmit() {
    return !this.hidden &&
      this.personConfirmation.foodChoice !== undefined &&
      [0, 1].includes(this.personConfirmation.foodChoice) &&
      !this.editingName &&
      this.personNameControl.valid;
  }

  get foodChoiceLabel() {
    switch (this.personConfirmation.foodChoice) {
      case 0:
        return 'Volaille';
      case 1:
        return 'Saumon';
    }
    return 'Aucun';
  }

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    if (this.hideable) {
      this.hidden = !this.personNameControl.value;
    }
  }

  async openBottomSheet() {
    const bottomSheetRef = this.bottomSheet.open(FoodMenuComponent);
    bottomSheetRef.instance.editMode = true;
    bottomSheetRef.instance.foodChoice = this.personConfirmation.foodChoice;
    const returnValue = await firstValueFrom(bottomSheetRef.afterDismissed());
    if (Number.isInteger(returnValue)) {
      this.personConfirmation.foodChoice = returnValue;
      this.confirmationChange.emit(this.personConfirmation);
    }
  }

  presenceChanged(b: boolean) {
    if (b) {
      this.panel?.open();
    } else {
      this.panel?.close();
    }
    this.confirmationChange.emit(this.personConfirmation);
  }

}
