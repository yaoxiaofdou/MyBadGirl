import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

// material
// import { MaterialModule } from '@angular/material';
// import 'hammerjs';

// router
import { appRoutes } from './app.routes';

// home
import { HomeComponent } from './component/home/home.component';
import { HomeListComponent } from './component/home/home-list/home-list.component';
import { HomeAsidenavComponent } from './component/home/home-asidenav/home-asidenav.component';

// ng-bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// detail
import { DetailsComponent } from './component/details/details.component';

// personal
import { PersonalComponent } from './component/personal/personal.component';
import { PersonalJoinComponent } from './component/personal/personal-join/personal-join.component';
import { PersonalReleaseComponent } from './component/personal/personal-release/personal-release.component';
import { PersonalCxisComponent } from './component/personal/personal-cxis/personal-cxis.component';

// user edit
import { UserEditComponent } from './component/user-edit/user-edit.component';

// server
import { HomeListDataService } from './server/home-list-data.service';
import { UserService } from './server/user.service';

// pipe
import { HomeListPipe } from './pipes/home-list.pipe';
import { LoginComponent } from './component/login/login.component';

// cookie
import { CookieService } from 'angular2-cookie/services/cookies.service';

// directive
import { MAlertDirective } from './directive/mAlert/m-alert.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HomeListComponent,
    HomeAsidenavComponent,
    DetailsComponent,
    PersonalComponent,
    PersonalJoinComponent,
    PersonalReleaseComponent,
    PersonalCxisComponent,
    HomeListPipe,
    UserEditComponent,
    LoginComponent,
    MAlertDirective
  ],
  providers: [HomeListDataService,UserService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
