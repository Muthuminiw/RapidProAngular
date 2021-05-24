import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observer, Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import * as sc from 'socketcluster-client';
// const http = require('http');
// const socketClusterClient = require('socketcluster-client');
// import {socketClusterClient} from 'socketcluster-client';
// import { DataService } from 'src/app/services/data.service';
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

const GET_CARS_PAGINATED = gql`query($first: Int!, $after: String!) {
    getAllCars(first: $first, after: $after) {
      nodes {
        id
        firstName
        lastName
        vin
        ageOfVehicle
      }
      pageInfo {
        hasNextPage
        endCursor
      }
  
      totalCount
    }
  }`;

const GET_CARS_WITH_PAGINATION = gql`query ($first:Int!,$offset:Int!,$orderBy:String!){getAllCarsAsc(first:$first,offset:$offset,orderBy:$orderBy){
nodes{
    id
    firstName
    lastName
    vin
    ageOfVehicle
}
totalCount
  
  
 
}
}`;
const EXPORT_BY_AGE = gql`query ($ageLimit:String!){getCarByAge(ageLimit:$ageLimit){ 
  message
}
}`;

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit, AfterContentInit {

  cars?: Car[];
  currentCar?: Car;
  currentIndex = -1;
  title = '';
  loading?: boolean;
  closeResult = '';
  stockQuote?: string;
  sub?: Subscription;
  observer!: Observer<string>;
  usernm = 'user-one';

  // page = 1;

  // pageSize = 3;

  page = 1;
  pageSize = 4;
  totalCount = 0;
  prevCursor = "";
  ageParam = "";
  socket: any;
  reqUn = 'bob';

  constructor(private toastr: ToastrService, private apollo: Apollo, private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log("Hits in here")
    this.retrieveCars(this.page);
    // this.socket = sc.create({
    //   hostname: 'localhost',
    //   secure: true,
    //   port: 8000,
    //   // Only necessary during debug if using a self-signed certificate
    //   // rejectUnauthorized: false
    // });
  }

  ngAfterContentInit() {
    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");

    // (async () => {
    //   console.log("connecting to socket qqqqqqqqq  " + `csvExpChannel${this.reqUn}`);
    //   // Subscribe to a channel.
    //   let myChannel = this.socket.subscribe(`csvExpChannel${this.reqUn}`);
    //   for await (let data of myChannel) {
    //     console.log("AAAAAAAAAAAAqqqqqqqqq" + data.status)
    //   }



    // })();
  }

  retrieveCars(pageNum: Number): void {
    console.log("eeeeeePageNumber :  " + this.page + " offset " + (this.page - 1) * this.pageSize);
    this.apollo.watchQuery<any>({
      query: GET_CARS_WITH_PAGINATION,
      variables: {
        first: this.pageSize,
        offset: (this.page - 1) * this.pageSize,
        orderBy: 'MANUFACTURED_DATE_ASC'
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        console.log(data);
        console.log(data.getAllCarsAsc);
        this.cars = data.getAllCarsAsc.nodes;
        this.totalCount = data.getAllCarsAsc.totalCount;
        console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmm"+data.getAllCarsAsc.totalCount);


      });

  }




  refreshList(pageNum: Number): void {
    this.retrieveCars(pageNum);
    this.currentCar = undefined;
    this.currentIndex = -1;
  }

  setActiveCar(car: Car, index: number): void {
    this.currentCar = car;
    this.currentIndex = index;
  }

  exportData(): string {
    this.apollo.watchQuery<any>({
      query: EXPORT_BY_AGE,
      variables: {
        ageLimit: this.ageParam,

      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        console.log(data);
        console.log(data.getCarByAge.message);
        let message = data.getCarByAge.message;
        this.toastr.success('Submitted!!', message, {
          timeOut: 2000,
        });
        // console.log( this.cars);


      });


    return "";
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

  // searchTitle(): void {
  //   this.currentCar = undefined;
  //   this.currentIndex = -1;

  //   this.carService.findByTitle(this.title)
  //     .subscribe(
  //       data => {
  //         this.cars = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // handlePageChange(event: number): void {
  //   this.page = event;
  //   this.retrieveCars();
  // }

}
