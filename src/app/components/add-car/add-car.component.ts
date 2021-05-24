// import { Component, OnInit } from '@angular/core';
// import { Car } from 'src/app/models/car.model';
// import { CarService } from 'src/app/services/car.service';

// @Component({
//   selector: 'app-add-car',
//   templateUrl: './add-car.component.html',
//   styleUrls: ['./add-car.component.css']
// })
// export class AddCarComponent implements OnInit {
//   car:Car = {
//     // title: '',
//     id: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     carMake:'',
//     carModel:'',
//     vin: '',
//     manufacturedDate:'',
//     ageOfVehicle:0
//   };
//   submitted = false;

//   constructor(private carService: CarService) { }

//   ngOnInit(): void {
//   }

//   saveCar(): void {
//     const data = {
//       firstName: this.car.firstName,
//       LastName: this.car.lastName
//     };

//     this.carService.create(data)
//       .subscribe(
//         response => {
//           console.log(response);
//           this.submitted = true;
//         },
//         error => {
//           console.log(error);
//         });
//   }

//   newCar(): void {
//     this.car = {
//       firstName: '',
//       lastName: ''
//     };
//   }

// }
