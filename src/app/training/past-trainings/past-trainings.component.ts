import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { iExercise } from 'src/app/interfaces/exercise.interface';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, OnDestroy {
  // dataSource: iExercise[] =[];
  displayedColumns = ['date', 'name', 'calories', 'state'];
  dataSource = new MatTableDataSource<iExercise>();
  myExercisesChangedSubcription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  myExercises: iExercise[] = [];
  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.getMyExercises();
    this.myExercisesChangedSubcription = this.trainingService.myExercisesChanged.subscribe((exercises: iExercise[]) => {
      this.myExercises = exercises;
      // this.dataSource = this.myExercises;
      this.dataSource = new MatTableDataSource<iExercise>(this.myExercises);
    })
    this.trainingService.fetchMyExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getMyExercises() {
    // this.dataSource = this.trainingService.getMyExercises();
    this.dataSource = new MatTableDataSource<iExercise>(this.trainingService.getMyExercises());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  ngOnDestroy() {
    this.myExercisesChangedSubcription.unsubscribe();
  }
}
