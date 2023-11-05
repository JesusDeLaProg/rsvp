import { Component, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FoodMenuComponent } from '../food-menu/food-menu.component';
import { firstValueFrom } from 'rxjs';
import { PersonConfirmation } from '../types/person-confirmation';

@Component({
  selector: 'rsvp-confirmation-person-card',
  templateUrl: './confirmation-person-card.component.html',
  styleUrls: ['./confirmation-person-card.component.scss']
})
export class ConfirmationPersonCardComponent {

  @ViewChild(MatExpansionPanel)
  panel?: MatExpansionPanel;

  @ViewChild('nameInput')
  nameInput?: ElementRef;

  personConfirmation: PersonConfirmation = {};
  @Input()
  set person(p: PersonConfirmation) {
    if (p.name !== this.personConfirmation.name
        || p.present !== this.personConfirmation.present
        || p.foodChoice !== this.personConfirmation.foodChoice) {
      this.personConfirmation = p;
      this.personNameControl.setValue(p.name || '');
      this.presenceChanged(this.personConfirmation.present ?? false);
      this.allergyControl.setValue(p.allergy || '');
    }
  }
  @Output()
  personChange = new EventEmitter<PersonConfirmation>();

  @Input()
  deleteable = false;
  @Output()
  deleted = new EventEmitter<void>();

  private editingName_ = false;
  get editingName() { return this.editingName_; }
  set editingName(b: boolean) {
    if (this.editingName_ = b) {
      setTimeout(() => this.nameInput?.nativeElement.focus(), 100);
    } else {
      this.personConfirmation.name = (this.personNameControl.value || '').trim();
      this.personNameControl.setValue(this.personConfirmation.name);
      this.personChange.emit(this.personConfirmation);
    }
  }

  allergyControl = new FormControl<string>('');
  personNameControl = new FormControl<string>('', [Validators.required,
  (c: AbstractControl<string>) => {
    const parts = c.value.trim().split(' ');
    if (parts.every(s => !!s) && parts.length >= 2) {
      return {};
    } else {
      return { completeName: true };
    }
  }]);

  get isReadyToSubmit() {
    return this.personConfirmation.foodChoice !== undefined &&
      [0, 1, 2].includes(this.personConfirmation.foodChoice) &&
      !this.editingName &&
      this.personNameControl.valid;
  }

  get foodChoiceLabel() {
    switch (this.personConfirmation.foodChoice) {
      case 0:
        return 'Volaille';
      case 1:
        return 'Saumon';
      case 2:
        return 'Végétarien';
    }
    return 'Aucun';
  }

  constructor(private bottomSheet: MatBottomSheet) { }

  async openBottomSheet() {
    const bottomSheetRef = this.bottomSheet.open(FoodMenuComponent);
    bottomSheetRef.instance.editMode = true;
    bottomSheetRef.instance.foodChoice = this.personConfirmation.foodChoice;
    const returnValue = await firstValueFrom(bottomSheetRef.afterDismissed());
    if (Number.isInteger(returnValue)) {
      this.personConfirmation.foodChoice = returnValue;
      this.personChange.emit(this.personConfirmation);
    }
  }

  delete() {
    this.deleted.emit();
  }

  presenceChanged(b: boolean) {
    if (b) {
      this.panel?.open();
    } else {
      this.panel?.close();
    }
    this.personChange.emit(this.personConfirmation);
  }

  nameInputLostFocus() {
    if (!this.personNameControl.invalid) {
      this.editingName = false;
    }
  }

  allergyInputLostFocus() {
    this.personConfirmation.allergy = this.allergyControl.value || '';
    this.personChange.emit(this.personConfirmation);
  }

}
