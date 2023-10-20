import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'rsvp-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss']
})
export class FoodMenuComponent {
  editMode = false;
  foodChoice: number|null = null;

  constructor(private bottomSheetRef?: MatBottomSheetRef<FoodMenuComponent>) {}

  closeBottomSheet() {
    this.bottomSheetRef?.dismiss(this.foodChoice);
  }
}