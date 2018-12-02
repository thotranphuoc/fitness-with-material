import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingCompoent } from './stop-trainig.component';
import { TrainingService } from 'src/app/services/training.service';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progressValue = 0;
  timer: any;
  @Output() trainingStop = new EventEmitter();
  constructor( 
    private dialog: MatDialog,
    private trainingService: TrainingService
    ) { }

  ngOnInit() {
    this.startOrResumeTimer();
    
  }

  startOrResumeTimer(){
    let step = this.trainingService.getRunningExercise().duration/100*1000;
    this.timer = setInterval(()=>{
      this.progressValue +=1;
      console.log(this.progressValue);
      if(this.progressValue>=100){
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    },step)
  }

  onStopInterval(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingCompoent, { data: {
      progress: this.progressValue
    }})

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
      if(result){
        // cancel/stop current training
        // this.trainingStop.emit();
        this.trainingService.cancelExercise(this.progressValue);
      }else{
        // continue training
        this.startOrResumeTimer();

      }
    })
  }

}
