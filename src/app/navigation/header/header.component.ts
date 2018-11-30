import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription
  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authState=>{
      this.isAuth = authState;
      console.log(this.isAuth)
    })
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

}
