import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { CarService } from 'src/app/services/car.service';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

const GET_CARS = gql`query{getCars{id
  firstName
  lastName
  email
  carMake
  carModel 
  vin
  manufacturedDate
  ageOfVehicle}}`;

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {

  cars?: Car[];
  currentCar?: Car;
  currentIndex = -1;
  title = '';
  loading?: boolean;
  closeResult = '';
  stockQuote?: string;
  sub?: Subscription;



  constructor(private carService: CarService,private toastr: ToastrService,private dataService: DataService, private apollo: Apollo,private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log("This invoked !!!");
    this.sub = this.dataService.getQuotes()
    .subscribe(quote => {
      this.stockQuote = quote;
      console.log('This is angular quote from web socket '+this.stockQuote);
      this.toastr.success('Download CSV Notification', this.stockQuote, {
        timeOut: 10000,
      });
    });
    this.retrieveCars();
  }

  retrieveCars(): void {
 
    this.apollo.watchQuery<any>({
      query: GET_CARS
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        console.log("Loading  gggg " + loading);
        console.log( data);
        console.log( data.getCars);
        console.log( data.getCars[0]);

        console.log("Loading  gggg222 " + loading);
        this.cars = data.getCars;
        console.log( this.cars);

       
      });
  }






  refreshList(): void {
    this.retrieveCars();
    this.currentCar = undefined;
    this.currentIndex = -1;
  }

  setActiveCar(car: Car, index: number): void {
    this.currentCar = car;
    this.currentIndex = index;
  }

  // removeAllTutorials(): void {
  //   this.carService.deleteAll()
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.refreshList();
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  searchTitle(): void {
    this.currentCar = undefined;
    this.currentIndex = -1;

    this.carService.findByTitle(this.title)
      .subscribe(
        data => {
          this.cars = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  


}
