import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateChanged = new Subject<boolean>()
  constructor(
    private snackbar: MatSnackBar) { }

  showToastMessage(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration
    })
  }
}
