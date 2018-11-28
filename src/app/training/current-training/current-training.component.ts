import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progressValue = 0;
  timer: any;
  constructor() { }

  ngOnInit() {
   
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
  }

}
