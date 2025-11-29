// src/app/auth/register/register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './register.html',
  styleUrls: []   
})
export class RegisterComponent {
  registerForm!: FormGroup;   
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialiser le form APRÈS que fb ait été injecté
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['participant', Validators.required],
      interests: ['']
    });
  }

  async register() {
    if (this.registerForm.invalid || this.isSubmitting) return;
    this.isSubmitting = true;

    const val = this.registerForm.value;

    const payload = {
      name: val.name!,
      email: val.email!.trim().toLowerCase(),
      password: val.password!,
      role: val.role! as 'participant' | 'organizer',
      interests: val.interests
        ? val.interests.split(',').map((s: string) => s.trim()).filter(Boolean)
        : []
    };

    try {
      await this.authService.register(payload);
      alert('Inscription réussie !');
      await this.router.navigate(['/login']);
    } catch (err: any) {
      console.error('Erreur register():', err);
      if (err?.code === 'auth/email-already-in-use') {
        alert('Cet email est déjà utilisé.');
      } else if (err?.code === 'auth/weak-password') {
        alert('Mot de passe trop faible. Minimum 6 caractères.');
      } else if (err?.code === 'auth/invalid-email') {
        alert('Email invalide.');
      } else {
        alert('Erreur : ' + (err?.message || err));
      }
    } finally {
      this.isSubmitting = false;
    }
  }
}
