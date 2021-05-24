import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';

import { UploadFilesComponent } from './components/upload-cardata/upload-cardata.component';
import { CommonModule } from '@angular/common';
import { CarDataListComponent } from './components/cardata-list/cardata-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: 'cars', component: CarsListComponent },
  { path: 'caritmes', component: CarDataListComponent },
  { path: 'cars/:id', component: CarDetailsComponent },
  { path: 'uploadData', component: UploadFilesComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

