import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ConfirmationPersonCardComponent } from './confirmation-person-card/confirmation-person-card.component';
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { FaqComponent } from './faq/faq.component';
import { SessionStartComponent } from './modals/session-start/session-start.component';
import { ConfirmationConfirmationComponent } from './modals/confirmation-confirmation/confirmation-confirmation.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationPageComponent,
    HomePageComponent,
    ConfirmationPersonCardComponent,
    FoodMenuComponent,
    FaqComponent,
    SessionStartComponent,
    ConfirmationConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp({"projectId":"firebase-marriage-rsvp","appId":"1:96894765673:web:77ba4f054baa54199f30f8","storageBucket":"firebase-marriage-rsvp.appspot.com","apiKey":"AIzaSyA2OD8AthCTiluUHV6NyVzpx0h-prU0LHQ","authDomain":"fir-marriage-rsvp.firebaseapp.com","messagingSenderId":"96894765673","measurementId":"G-SGQB7F9Z8Y"})),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
