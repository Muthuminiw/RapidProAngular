import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { AddCarComponent } from './components/add-car/add-car.component';

const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: 'cars', component: CarsListComponent },
  { path: 'cars/:id', component: CarDetailsComponent },
  { path: 'add', component: AddCarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
