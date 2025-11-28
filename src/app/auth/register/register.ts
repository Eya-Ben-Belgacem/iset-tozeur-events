import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2>Inscription</h2>
    <form [formGroup]="registerForm" (ngSubmit)="register()">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email">
        <mat-error *ngIf="registerForm.get('email')?.hasError('required')">L'email est requis</mat-error>
        <mat-error *ngIf="registerForm.get('email')?.hasError('email')">Email invalide</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Mot de passe</mat-label>
        <input matInput formControlName="password" type="password">
        <mat-error *ngIf="registerForm.get('password')?.hasError('required')">Le mot de passe est requis</mat-error>
        <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">Minimum 6 caractères</mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">S’inscrire</button>
    </form>
  `,
  styles: [
    `.full-width { width: 100%; margin-bottom: 16px; }`,
    `h2 { text-align: center; }`
  ]
})
export class RegisterComponent {
  registerForm: any;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    const auth = getAuth();
    const { email, password } = this.registerForm.value;
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => alert('Utilisateur créé !'))
        .catch(err => alert(err.message));
    }
  }
}
