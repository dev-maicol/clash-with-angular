import { Routes } from '@angular/router';
import { ListCardsComponent } from './components/list-cards/list-cards.component';
import { ClanInformationComponent } from './components/clan-information/clan-information.component';

export const routes: Routes = [
  {
    path: '', component: ListCardsComponent
  },
  {
    path: 'information', component: ClanInformationComponent
  }
];
