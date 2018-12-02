import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  onGoingTraining = false;
  exerciseSubscription: Subscription
  constructor(
    private authService: AuthService,
    private trainingService: TrainingService
    ) {}

  ngOnInit() {
    console.log(this.authService.isAuth());
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe((exercise)=>{
      if(exercise){
        this.onGoingTraining = true;
      }else{
        this.onGoingTraining = false;
      }
    })
  }

}
