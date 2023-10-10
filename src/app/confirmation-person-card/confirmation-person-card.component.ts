import { Component, ViewChild, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FoodMenuComponent } from '../food-menu/food-menu.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'rsvp-confirmation-person-card',
  templateUrl: './confirmation-person-card.component.html',
  styleUrls: ['./confirmation-person-card.component.scss']
})
export class ConfirmationPersonCardComponent {

  @ViewChild(MatExpansionPanel)
  panel!: MatExpansionPanel;
  
  @Input()
  set personName(name: string) {
    this.personNameControl.setValue(name);
  }

  editingName = false;
  personNameControl = new FormControl('', [Validators.required]);
  present: boolean|null = null;
  foodChoice: number|null = null;

  constructor(private bottomSheet: MatBottomSheet) {}

  isReadyToSubmit() {
    return this.present === false || this.foodChoice === 0 || this.foodChoice === 1;
  }

  getFoodChoiceLabel() {
    switch(this.foodChoice) {
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
