import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2>Connexion</h2>
    <form [formGroup]="loginForm" (ngSubmit)="login()">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email">
        <mat-error *ngIf="loginForm.get('email')?.hasError('required')">L'email est requis</mat-error>
        <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Email invalide</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Mot de passe</mat-label>
        <input matInput formControlName="password" type="password">
        <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Le mot de passe est requis</mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Se connecter</button>
    </form>
  `,
  styles: [`.full-width { width: 100%; margin-bottom: 16px; } h2 { text-align: center; }`]
})
export class LoginComponent {
  loginForm: any;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    const auth = getAuth();
    const { email, password } = this.loginForm.value;
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => alert('Connexion réussie !'))
        .catch(err => alert(err.message));
    }
  }
}
