// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register';
import { LoginComponent } from './auth/login/login';
import { HomeComponent} from './events/home/home'; // créer une page d'accueil simple

export const routes: Routes = [
  { path: '', component: HomeComponent },       // page d'accueil / dashboard
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }                // redirection pour les routes inconnues
];
