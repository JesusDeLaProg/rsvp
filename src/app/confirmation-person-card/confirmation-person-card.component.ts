import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FoodMenuComponent } from '../food-menu/food-menu.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'rsvp-confirmation-person-card',
  templateUrl: './confirmation-person-card.component.html',
  styleUrls: ['./confirmation-person-card.component.scss']
})
export class ConfirmationPersonCardComponent implements OnInit {

  @Input() hideable: boolean = false;

  @ViewChild(MatExpansionPanel)
  panel!: MatExpansionPanel;

  @Input()
  set personName(name: string) {
    this.personNameControl.setValue(name);
  }

  hidden = false;
  editingName = false;
  personNameControl = new FormControl('', [Validators.required,
    (c: AbstractControl<string>) => {
      const parts = c.value.split(' ');
      if (parts.every(s => !!s) && parts.length >= 2) {
        return {};
      } else {
        return { completeName: true };
      }
    }]);
  present: boolean | null = null;
  foodChoice: number | null = null;

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.panel?.close();
    if (this.hideable) {
      this.hidden = !this.personNameControl.value;
    }
  }

  get isReadyToSubmit() {
    return !this.hidden &&
      this.foodChoice !== null &&
      [0, 1].includes(this.foodChoice) &&
      !this.editingName &&
      this.personNameControl.valid;
  }

  getFoodChoiceLabel() {
    switch (this.foodChoice) {
      case 0:
        return 'Volaille';
      case 1:
        return 'Saumon';
    }
    return 'Aucun';
  }

  async openBottomSheet() {
    const bottomSheetRef = this.bottomSheet.open(FoodMenuComponent);
    bottomSheetRef.instance.editMode = true;
    bottomSheetRef.instance.foodChoice = this.foodChoice;
    const returnValue = await firstValueFrom(bottomSheetRef.afterDismissed());
    if (Number.isInteger(returnValue)) {
      this.foodChoice = returnValue;
    }
  }

}
