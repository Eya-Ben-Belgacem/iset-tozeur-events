// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'participant' | 'organizer';
  interests?: string[];
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Inscription
  async register(data: RegisterPayload) {
    const { email, password, name, role, interests } = data;

    try {
      // Vérifie si l'email existe déjà
      const methods = await fetchSignInMethodsForEmail(this.auth, email);
      if (methods.length > 0) {
        throw new Error('Cet email est déjà utilisé');
      }

      const cred = await createUserWithEmailAndPassword(this.auth, email, password);

      await setDoc(doc(this.firestore, 'users', cred.user.uid), {
        uid: cred.user.uid,
        name,
        email,
        role,
        interests: interests || [],
        createdAt: new Date()
      });

      return cred;

    } catch (err: any) {
      console.error('Erreur registration:', err);
      throw err;
    }
  }

  // Connexion
  async login(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (err: any) {
      console.error('Erreur login:', err);
      throw err;
    }
  }

  // Déconnexion
  async logout() {
    return await signOut(this.auth);
  }
}
