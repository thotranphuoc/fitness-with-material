import { Injectable } from '@angular/core';
import { iUser } from '../interfaces/user.interface';
import { iAuthData } from '../interfaces/auth-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: iUser
  constructor() { }

  userRegister(authData: iAuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*10000).toString()
    }
  }

  login(authData: iAuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*10000).toString()
    }
  }

  logout(){
    this.user = null;
  }

  getUser(){
    return {... this.user};
  }

  isAuth(){
    return this.user !== null
  }

}
