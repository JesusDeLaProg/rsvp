import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationPageComponent } from './confirmation/confirmation-page/confirmation-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FaqPageComponent } from './faq/faq-page/faq-page.component';

const routes: Routes = [
  { path: 'confirmation', component: ConfirmationPageComponent },
  { path: 'faq', component: FaqPageComponent },
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
