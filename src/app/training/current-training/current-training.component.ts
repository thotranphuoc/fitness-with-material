import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingCompoent } from './stop-trainig.component';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progressValue = 0;
  timer: any;
  @Output() trainingStop = new EventEmitter();
  constructor( private dialog: MatDialog) { }

  ngOnInit() {
    this.startOrResumeTimer();
    
  }

  startOrResumeTimer(){
    this.timer = setInterval(()=>{
      this.progressValue +=5;
      console.log(this.progressValue);
      if(this.progressValue>=100){
        clearInterval(this.timer);
      }
    },1000)
  }

  onStopInterval(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingCompoent, { data: {
      progress: this.progressValue
    }})

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
      if(result){
        this.trainingStop.emit();
      }else{
        this.startOrResumeTimer();
      }
    })
  }

}
