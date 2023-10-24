import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultHomeComponent } from './default-home/default-home.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  { path: 'default-home', component: DefaultHomeComponent },
  { path: 'confirmation', component: ConfirmationPageComponent },
  { path: 'faq', component: FaqComponent },
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
