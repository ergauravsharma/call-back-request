import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RequestComponent } from './components/request/request.component'
import { AuthGuard } from "./shared/auth.guard";
import { AdminComponent} from './components/admin/admin.component';
import { CallbackDoneComponent } from './components/callback-done/callback-done.component';
import { AuthService } from './shared/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/request', pathMatch: 'full' },
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  {path:'request',component:RequestComponent},
  { path: 'admin/:id', component: AdminComponent, canActivate: [AuthGuard] },
  {path:'previous-callback', component:CallbackDoneComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
