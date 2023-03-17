import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';

// service imports
import { InterceptorService } from './services/interceptor.service';

// component imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/common/header/header.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { PrivacyPolicyComponent } from './components/common/privacy-policy/privacy-policy.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/profile/users/users.component';
import { ConfirmRoleChangeDialog } from './components/profile/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { HomeIntroComponent } from './components/home/home-intro/home-intro.component';
import { HomeSpecsComponent } from './components/home/home-specs/home-specs.component';
import { HomeCreditsComponent } from './components/home/home-credits/home-credits.component';
import { FilterComponent } from './components/common/filter/filter.component';
import { AddModelViewComponent } from './components/model/add-model-view/add-model-view.component';
import { AddModelComponent } from './components/model/add-model/add-model.component';
import { ListModelViewComponent } from './components/model/list-model-view/list-model-view.component';
import { ListModelComponent } from './components/model/list-model/list-model.component';
import { DetailModelViewComponent } from './components/model/detail-model-view/detail-model-view.component';
import { DetailModelComponent } from './components/model/detail-model/detail-model.component';
import { ThreeDSceneComponent } from './components/three-d-scene/three-d-scene.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    PrivacyPolicyComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ConfirmRoleChangeDialog,
    UsersComponent,
    HomeComponent,
    HomeIntroComponent,
    HomeSpecsComponent,
    HomeCreditsComponent,
    FilterComponent,
    AddModelViewComponent,
    AddModelComponent,
    ListModelViewComponent,
    ListModelComponent,
    DetailModelViewComponent,
    DetailModelComponent,
    ThreeDSceneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSliderModule,
    NgxMatColorPickerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }, {
    provide: MAT_COLOR_FORMATS,
    useValue: NGX_MAT_COLOR_FORMATS
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
