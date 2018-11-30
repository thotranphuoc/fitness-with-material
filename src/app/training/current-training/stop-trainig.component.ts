import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
    selector: 'app-stop-trainig',
    templateUrl: 'stop-training.component.html'
})
export class StopTrainingCompoent{
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any){

    }
}