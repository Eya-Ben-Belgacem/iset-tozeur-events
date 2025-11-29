// src/app/auth/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  loginForm: any;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onLogin() {
    if (this.loginForm.invalid || this.isSubmitting) return;
    this.isSubmitting = true;

    const { email, password } = this.loginForm.value;

    try {
      const userCred = await this.authService.login(email, password);
      console.log('Utilisateur connecté :', userCred.user.uid);
      alert('Connexion réussie !');
      await this.router.navigate(['/']); // page d’accueil/dashboard

    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        alert('Utilisateur non trouvé');
      } else if (err.code === 'auth/wrong-password') {
        alert('Mot de passe incorrect');
      } else {
        alert('Erreur connexion : ' + (err.message || err));
      }
      console.error(err);
    } finally {
      this.isSubmitting = false;
    }
  }
}
