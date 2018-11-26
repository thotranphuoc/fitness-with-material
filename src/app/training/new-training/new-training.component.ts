import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  foods = [
    {viewValue: 'Crunches', value: 'crunches'},
    {viewValue: 'Touch Toes', value: 'touch-toe'},
    {viewValue: 'Side Lunges', value: 'side-lunges'},
    {viewValue: 'Burpees', value: 'burpees'},
  ]
  constructor() { }

  ngOnInit() {
  }

}
