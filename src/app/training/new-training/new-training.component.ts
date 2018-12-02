import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { iExercise } from 'src/app/interfaces/exercise.interface';
import { TrainingService } from 'src/app/services/training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // availableExercises: iExercise[] =[];
  availableExercises: iExercise[]
  exercisesSubscription: Subscription
  constructor(
    private trainingService: TrainingService,
    private afs: AngularFirestore
  ) {
  }
  // @Output() trainingStart = new EventEmitter();

  ngOnInit() {
    // this.availableExercises = this.trainingService.getExerices();
    // this.availableExercises = this.afs.collection('availableExercises').valueChanges();
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(exercieses=>{
      this.availableExercises = exercieses;
    })
    this.trainingService.fetchExercises()
  }

  onTrainingStart(f) {
    console.log(f)
    // this.trainingService.startExercise()
    this.trainingService.startExercise(f.value.selectedID);
  }

  ngOnDestroy(){
    this.exercisesSubscription.unsubscribe();
  }

}
