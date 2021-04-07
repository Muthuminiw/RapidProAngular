import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  currentCar = null;
  message = '';

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.message = '';
    this.getCar(this.route.snapshot.paramMap.get('id'));
  }

  getCar(id) {
    this.carService.get(id)
      .subscribe(
        data => {
          this.currentCar = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

 

  updateCar() {
    this.carService.update(this.currentCar.id, this.currentCar)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The car detail was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteCar() {
    this.carService.delete(this.currentCar.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/cars']);
        },
        error => {
          console.log(error);
        });
  }
}
