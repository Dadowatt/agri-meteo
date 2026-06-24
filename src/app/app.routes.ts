import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { TableauBord } from './components/tableau-bord/tableau-bord';

export const routes: Routes = [
  
      { path: '',component: Accueil },

      { path: 'dashboard', component: TableauBord },

      { path: '**', redirectTo: '' }
];
