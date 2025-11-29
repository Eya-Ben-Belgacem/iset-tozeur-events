// src/app/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Bienvenue sur la page d'accueil</h2>
    <p>Vous êtes connecté.</p>
  `
})
export class HomeComponent {}
