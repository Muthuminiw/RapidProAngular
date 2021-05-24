import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observer, Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';



const EXPORT_BY_AGE = gql`query ($ageLimit:String!){getCarByAge(ageLimit:$ageLimit){ 
  message
}
}`;

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
  observer!: Observer<string>;
  usernm = 'user-one';
  isProcessing = false;


  page = 1;
  pageSize = 4;
  totalCount = 0;
  prevCursor = "";
  ageParam = "";
  socket: any;
  reqUn = 'bob';

  constructor(private toastr: ToastrService, private apollo: Apollo, private modalService: NgbModal) { }

  ngOnInit(): void {

 
  }



  exportData(): void {
    this.isProcessing = true;
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
        this.isProcessing = false;
      
      });

  }


  
}
