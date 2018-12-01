import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  onGoingTraining = false;
  constructor(private authService: AuthService) {
    
   }

  ngOnInit() {
    console.log(this.authService.isAuth());
  }

}
