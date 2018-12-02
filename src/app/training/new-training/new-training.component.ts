import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { iExercise } from 'src/app/interfaces/exercise.interface';
import { TrainingService } from 'src/app/services/training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  // availableExercises: iExercise[] =[];
  availableExercises: Observable<any[]>
  constructor(
    private trainingService: TrainingService,
    private afs: AngularFirestore
  ) { 
  }
  // @Output() trainingStart = new EventEmitter();
  
  ngOnInit() {
    // this.availableExercises = this.trainingService.getExerices();
    this.availableExercises = this.afs.collection('availableExercises').valueChanges();
  }

  onTrainingStart(f){
    console.log(f)
    // this.trainingService.startExercise()
    this.trainingService.startExercise(f.value.selectedID);
  }

}
