
import { Injectable } from '@angular/core';
import { iExercise } from '../interfaces/exercise.interface';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<iExercise>();
  Exercises: iExercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ]
  runningExercise: iExercise;

  myExercises: iExercise[] = [];
  constructor() { }

  getExerices(){
    return this.Exercises.slice();
  }

  startExercise(selectedID: string){
    this.runningExercise = this.Exercises.find(ex=> ex.id == selectedID);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(){
    this.myExercises.push({
      ... this.runningExercise,
      date: new Date(),
      state: 'completed' 
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    console.log(this.myExercises);
  }

  cancelExercise(progressNumber: number){
    this.myExercises.push({
      ... this.runningExercise,
      duration: this.runningExercise.duration*(progressNumber/100),
      calories: this.runningExercise.calories*(progressNumber/100),
      date: new Date(),
      state: 'cancelled' 
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    console.log(this.myExercises);
  }

  getRunningExercise(){
    return {... this.runningExercise};
  }

  getMyExercises(){
    return this.myExercises.slice();
  }


}
