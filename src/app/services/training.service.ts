
import { Injectable } from '@angular/core';
import { iExercise } from '../interfaces/exercise.interface';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<iExercise>();
  exercisesChanged = new Subject<iExercise[]>(); // moi khi exercises updated;
  myExercisesChanged = new Subject<iExercise[]>();
  // Exercises: iExercise[] = [
  //   { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  //   { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
  //   { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  //   { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  // ]

  availableExercises: iExercise[] =[];
  runningExercise: iExercise;

  myExercises: iExercise[] = [];
  constructor( private afs: AngularFirestore) { }

  // getExerices(){
  //   return this.availableExercises.slice();
  // }

  fetchExercises(){
    this.afs.collection('availableExercises')
    .snapshotChanges()
    .pipe(
      map(docArray => {
        return docArray.map(doc=>{
          return {
            id: doc.payload.doc.id,
            // ... doc.payload.doc.data() as iExercise,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          }
        })
        
      })
    )
    .subscribe((exercises: iExercise[])=>{
      this.availableExercises = exercises;
      this.exercisesChanged.next(this.availableExercises.slice());
      // this.exercisesChanged.next([...this.availableExercises]); // same line above
    })
  
  }

  startExercise(selectedID: string){
    this.runningExercise = this.availableExercises.find(ex=> ex.id == selectedID);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(){
    this.addMyExercise2FB({
      ... this.runningExercise,
      date: new Date(),
      state: 'completed' 
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    console.log(this.myExercises);
  }

  cancelExercise(progressNumber: number){
    // this.myExercises.push({
    //   ... this.runningExercise,
    //   duration: this.runningExercise.duration*(progressNumber/100),
    //   calories: this.runningExercise.calories*(progressNumber/100),
    //   date: new Date(),
    //   state: 'cancelled' 
    // });
    this.addMyExercise2FB({
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

  fetchMyExercises(){
    this.afs.collection('myExercises').valueChanges().subscribe((exercises: iExercise[])=>{
      this.myExercises = exercises;
      this.myExercisesChanged.next(exercises);
    })
  }

  addMyExercise2FB(exercise: iExercise){
    this.afs.collection('myExercises').add(exercise);
  }


}
