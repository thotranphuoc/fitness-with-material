import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { iUser } from '../interfaces/user.interface';
import { iAuthData } from '../interfaces/auth-data.interface';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './training.service';
import { UiService } from './ui.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: iUser = null;
  private isAuthenticated = false;
  constructor(
    private router: Router,
    private afa: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService
  ) { }

  initAuthListener() {
    this.afa.authState.subscribe((user) => {
      if (user) {
        console.log('user logged in');
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        console.log('user not logged in')
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.trainingService.cancelSubscription();
      }
    })
  }
  userRegister(authData: iAuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random()*10000).toString()
    // }
    this.uiService.loadingStateChanged.next(true);
    this.afa.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this.uiService.loadingStateChanged.next(false);
        // console.log(res);
        // this.authSuccessful();
      })
      .catch((err) => {
        console.log(err);
        this.uiService.showToastMessage(err.message, null, 5000);
        this.uiService.loadingStateChanged.next(false);
      })

  }

  login(authData: iAuthData) {
    this.uiService.loadingStateChanged.next(true);
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // }
    this.afa.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        console.log(res);
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((err) => {
        console.log(err);
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showToastMessage(err.message, null, 5000);
      })
  }

  logout() {
    // this.user = null;
    this.afa.auth.signOut();
    // this.authUnsuccessful();

  }

  // getUser() {
  //   return { ... this.user };
  // }

  isAuth() {
    // return this.user !== null
    // return this.afa.auth.currentUser? true : false
    return this.isAuthenticated;
  }

  // authSuccessful() {
  //   this.isAuthenticated = true;
  //   this.authChange.next(true);
  //   this.router.navigate(['/training']);
  // }

  // authUnsuccessful() {
  //   this.isAuthenticated = false;
  //   this.authChange.next(false);
  //   this.router.navigate(['/login']);
  //   this.trainingService.cancelSubscription();
  // }

}
