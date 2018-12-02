import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { iExercise } from 'src/app/interfaces/exercise.interface';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  availableExercises: iExercise[] =[];
  constructor(
    private trainingService: TrainingService
  ) { }
  // @Output() trainingStart = new EventEmitter();
  
  ngOnInit() {
    this.availableExercises = this.trainingService.getExerices();
  }

  onTrainingStart(f){
    console.log(f)
    // this.trainingService.startExercise()
    this.trainingService.startExercise(f.value.selectedID);
  }

}
