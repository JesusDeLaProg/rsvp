import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'rsvp-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss']
})
export class FoodMenuComponent {
  editMode = false;
  foodChoice?: number;

  constructor(private bottomSheetRef?: MatBottomSheetRef<FoodMenuComponent>) {}

  closeBottomSheet() {
    this.bottomSheetRef?.dismiss(this.foodChoice);
  }

  foodChoiceClicked(choice: number) {
    if (choice === this.foodChoice) {
      this.closeBottomSheet();
    }
  }
}
