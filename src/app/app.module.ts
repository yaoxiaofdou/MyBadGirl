import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

// router
import { AppRouterModule } from './app.routes';

// home
import { HomeComponent } from './home/home.component';
import { HomeListComponent } from './home/home-list/home-list.component';

// ng-bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouterModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HomeListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
