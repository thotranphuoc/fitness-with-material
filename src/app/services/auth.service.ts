import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { iUser } from '../interfaces/user.interface';
import { iAuthData } from '../interfaces/auth-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: iUser
  constructor() { }

  userRegister(authData: iAuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*10000).toString()
    }
    this.authChange.next(true);
  }

  login(authData: iAuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*10000).toString()
    }
    this.authChange.next(true);
  }

  logout(){
    this.user = null;
    this.authChange.next(false);
  }

  getUser(){
    return {... this.user};
  }

  isAuth(){
    return this.user !== null
  }

}
