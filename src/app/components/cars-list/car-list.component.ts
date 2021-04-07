import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarsListComponent implements OnInit {

  cars: any;
  currentCar= null;
  currentIndex = -1;
  model = '';

  // public uploader: FileUploader = new FileUploader({
  //   url:  'http://localhost:4000/csv/csvFrontFileUpload',
  //   itemAlias: 'image'
  // });

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.retrieveTutorials();
    // this.uploader.onAfterAddingFile = (file) => {
    //   file.withCredentials = false;
    // };
    // this.uploader.onCompleteItem = (item: any, status: any) => {
    //   console.log('Uploaded File Details:', item);
    
    // };
  }

  retrieveTutorials() {
    this.carService.getAll()
      .subscribe(
        data => {
          this.cars = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveTutorials();
    this.currentCar = null;
    this.currentIndex = -1;
  }

  setActiveCar(car, index) {
    this.currentCar= car;
    this.currentIndex = index;
  }


  searchByModel() {
    //TODO Search by Model
    // this.carService.findByModel(this.title)
    //   .subscribe(
    //     data => {
    //       this.car = data;
    //       console.log(data);
    //     },
    //     error => {
    //       console.log(error);
    //     });
  }
}
