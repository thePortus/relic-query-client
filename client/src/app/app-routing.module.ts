import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// service imports
import { AuthGuardService } from './services/auth-guard.service';
import { IsAdminService } from './services/is-admin.service';

// component imports
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { PrivacyPolicyComponent } from './components/common/privacy-policy/privacy-policy.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListModelViewComponent } from './components/model/list-model-view/list-model-view.component';
import { DetailModelViewComponent } from './components/model/detail-model-view/detail-model-view.component';
import { AddModelViewComponent } from './components/model/add-model-view/add-model-view.component';

const routes: Routes = [
  // Set routes, designating middleware to check if user is logged in/an admin for certain routes
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'models', component: ListModelViewComponent },
  { path: 'models/add', canActivate: [AuthGuardService, IsAdminService], component: AddModelViewComponent },
  { path: 'models/:id', component: DetailModelViewComponent },
  // redirects root to home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // set 404 component and redirect all other entered routes to 404
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
