import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { iUser } from '../interfaces/user.interface';
import { iAuthData } from '../interfaces/auth-data.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: iUser
  constructor(
    private router: Router
  ) { }

  userRegister(authData: iAuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*10000).toString()
    }
    this.authSuccessful();
  }

  login(authData: iAuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*10000).toString()
    }
    this.authSuccessful();
  }

  logout(){
    this.user = null;
    this.authUnsuccessful();

  }

  getUser(){
    return {... this.user};
  }

  isAuth(){
    return this.user !== null
  }

  authSuccessful(){
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  authUnsuccessful(){
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

}
