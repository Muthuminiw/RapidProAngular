import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GraphQLModule } from './graphql.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { CarsListComponent } from './components/cars-list/cars-list.component';
import { UploadFilesComponent } from './components/upload-cardata/upload-cardata.component';
import { DialogsModule } from './components/dialogs/dialogs.module';
import { CarDataListComponent } from './components/cardata-list/cardata-list.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,

    CarsListComponent,
    UploadFilesComponent,
    CarDataListComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule,
    NgbModule,
    DialogsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [ 
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
