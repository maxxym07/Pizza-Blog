import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userStatusChanges = new Subject<string>();

  constructor(private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private router: Router) { }

    signIn(email: string, password: string): void {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(user => {
          this.afFirestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
            snap => {
              snap.forEach(userRef => {
                localStorage.setItem('user', JSON.stringify(userRef.data()));
                if (userRef.data().role === 'admin' && userRef.data().access) {
                  this.router.navigateByUrl('admin');
                  this.userStatusChanges.next('admin');
                }
                else if(userRef.data().role == 'user'){
                  this.router.navigateByUrl('profile');
                  this.userStatusChanges.next('user')
                }
              });
            }
          );
        })
        .catch(err => console.log(err));
    }

  signOut(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/home');
        this.userStatusChanges.next('logout');
      })
      .catch(err => console.log(err));
  }

  signUp(email: string, password: string, firstName: string, lastName: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = {
          id: userResponse.user.uid,
          email: userResponse.user.email,
          role: 'user',
          firstName: firstName,
          lastName: lastName
        };
        this.afFirestore.collection('users').add(user)
          .then(data => {
            data.get()
              .then(user => {
                console.log(user.data());
                localStorage.setItem('user', JSON.stringify(user.data()))
                this.router.navigateByUrl('profile')
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

}
