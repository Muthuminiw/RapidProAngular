import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Apollo, gql } from 'apollo-angular';

const GET_CAR = gql`query($id:ID!){carById(id:$id){id
  firstName
  lastName
  email
  }}`;

const DELETE_CAR = gql`mutation($id:ID!){deleteCar(id:$id)}`;

const UPDATE_CAR = gql`mutation($id:ID!,$firstName:String!,$lastName:String!,$email:String!){
    updateCarById(id:$id,firstName:$firstName,lastName:$lastName,email:$email){
id
  firstName
  lastName
  email
      
      }
}`;


@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  currentCar: Car = {
    // title: '',
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    carMake: '',
    carModel: '',
    vin: '',
    manufacturedDate: '',
    ageOfVehicle: 0
  };
  message = '';

  constructor(
 
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo) { }

  ngOnInit(): void {
    this.message = '';
    this.getCar(this.route.snapshot.params.id);
  }

  getCar(idParam: string): void {

    this.apollo.watchQuery<any>({
      query: GET_CAR,
      variables: {
        id: idParam
      }
    })
      .valueChanges
      .subscribe(({ data }) => {

        // this.currentTutorial = data.carById;
        this.currentCar = Object.assign([], data.carById);

      });

  }


  updateCar(): void {
    this.message = '';


    this.apollo.mutate({
      mutation: UPDATE_CAR,
      variables: {

        "id": this.currentCar.id,
        "firstName": this.currentCar.firstName,
        "lastName": this.currentCar.lastName,
        "email": this.currentCar.email
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.message = this.message ? this.message : 'This car was updated successfully!';
    }, (error) => {
      console.log('Updation Failed', error);
    });


  }

  deleteCar(): void {
    // this.tutorialService.delete(this.currentTutorial.id)
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.router.navigate(['/tutorials']);
    //     },
    //     error => {
    //       console.log(error);
    //     });
    this.apollo.mutate({
      mutation: DELETE_CAR,
      variables: {

        "id": this.currentCar.id
      }
    }).subscribe(({ data }) => {
    
      this.router.navigate(['/cars']);
    }, (error) => {
      console.log('Delete Failed', error);
    });
  }
  
}
