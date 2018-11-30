import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
    console.log(this.maxDate);
  }

  submit(f: NgForm){
    console.log(f);
    this.authService.userRegister({
      email: f.value.email,
      password: f.value.password
    })
  }
}
