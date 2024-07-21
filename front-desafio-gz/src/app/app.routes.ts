import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RendimentoComponent } from './components/rendimento/rendimento.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'rendimento', component: RendimentoComponent }
];
