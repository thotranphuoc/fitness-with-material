import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { iUser } from '../interfaces/user.interface';
import { iAuthData } from '../interfaces/auth-data.interface';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: iUser = null;
  private isAuthenticated = false;
  constructor(
    private router: Router,
    private afa: AngularFireAuth
  ) { }

  userRegister(authData: iAuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random()*10000).toString()
    // }
    this.afa.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        console.log(res);
        this.authSuccessful();
      })
      .catch((err) => {
        console.log(err);
      })
    
  }

  login(authData: iAuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // }
    this.afa.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then((res)=>{
      console.log(res);
      this.authSuccessful();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  logout() {
    // this.user = null;
    this.afa.auth.signOut();
    this.authUnsuccessful();

  }

  // getUser() {
  //   return { ... this.user };
  // }

  isAuth() {
    // return this.user !== null
    // return this.afa.auth.currentUser? true : false
    return this.isAuthenticated;
  }

  authSuccessful() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  authUnsuccessful() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

}
