import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { iExercise } from 'src/app/interfaces/exercise.interface';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {
  // dataSource: iExercise[] =[];
  dataSource ;
  displayedColumns = ['date', 'name', 'calories', 'state'];

  @ViewChild(MatSort) sort: MatSort
  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.getMyExercises();
  }

  getMyExercises(){
    // this.dataSource = this.trainingService.getMyExercises();
    this.dataSource = new MatTableDataSource<iExercise>(this.trainingService.getMyExercises());
    this.dataSource.sort = this.sort;
  }

}
