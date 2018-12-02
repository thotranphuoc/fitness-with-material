import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { iExercise } from 'src/app/interfaces/exercise.interface';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {
  dataSource: iExercise[] =[];
  displayedColumns = ['date', 'name', 'calories', 'state'];
  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.getMyExercises();
  }

  getMyExercises(){
    this.dataSource = this.trainingService.getMyExercises();
  }

}
