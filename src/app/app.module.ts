import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

// router
import { appRoutes } from './app.routes';

// home
import { HomeComponent } from './home/home.component';
import { HomeListComponent } from './home/home-list/home-list.component';
import { HomeAsidenavComponent } from './home/home-asidenav/home-asidenav.component';

// ng-bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// detail
import { DetailsComponent } from './details/details.component';

// personal
import { PersonalComponent } from './personal/personal.component';
import { PersonalJoinComponent } from './personal/personal-join/personal-join.component';
import { PersonalReleaseComponent } from './personal/personal-release/personal-release.component';
import { PersonalCxisComponent } from './personal/personal-cxis/personal-cxis.component';

// user edit
import { UserEditComponent } from './user-edit/user-edit.component';

// server
import { HomeListDataService } from './server/home-list-data.service';
import { UserService } from './server/user.service';

// pipe
import { HomeListPipe } from './pipes/home-list.pipe';


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
    UserEditComponent
  ],
  providers: [HomeListDataService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
