import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GraphQLModule } from './graphql.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddCarComponent } from './components/add-car/add-car.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AddCarComponent,
    CarDetailsComponent,
    CarsListComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule,
    NgbModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [ DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
