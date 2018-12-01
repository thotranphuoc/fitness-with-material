import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { FlexboxComponent } from './example/flexbox/flexbox.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
{ path:'', component: WelcomeComponent },
{ path:'signup', component: SignupComponent },
{ path:'login', component: LoginComponent },
{ path:'training', component: TrainingComponent, canActivate: [AuthGuard] },
{ path:'flexbox', component: FlexboxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
