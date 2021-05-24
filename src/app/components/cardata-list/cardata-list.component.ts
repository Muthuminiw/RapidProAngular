import { Component, AfterViewInit, QueryList, ViewChildren, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';
import { Observer, Subscription } from 'rxjs';


// import { NgbdSortableHeaderDirective, SortEvent, SortDirection } from '../sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NotificationComponent } from '../dialogs/notification/notification.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car.model';
const GET_CARS_WITH_PAGINATION = gql`query ($first:Int!,$offset:Int!,$orderBy:String!){getAllCarsAsc(first:$first,offset:$offset,orderBy:$orderBy){
    nodes{
        id
        firstName
        lastName
        vin
        email
    }
    totalCount
    }
    }`;
    const GET_CARS_FILTERED_WITH_PAGINATION = gql`query ($first:Int!,$offset:Int!,$orderBy:String!,$carModel:String!){getAllCarsFilteredAsc(first:$first,offset:$offset,orderBy:$orderBy,carModel:$carModel){
        nodes{
            id
            firstName
            lastName
            vin
            email
        }
        totalCount
        }
        }`;
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
    selector: 'app-cardata-list',
    templateUrl: './cardata-list.component.html',
    styleUrls: ['./cardata-list.component.css']
})
export class CarDataListComponent implements OnInit {


    cars?: Car[];
    // sortColumn = 'lastName';
    // sortDirection: SortDirection = 'asc';
    totalCount = 0;
    pageSize = 100;
    page = 1;
    isProcessing = true;
    carModel = "";
    // expandedStudents: Set<number> = new Set<number>();
    // tableFilters: Map<string, TableFilter> = new Map<string, TableFilter>();
    editCarId = -1;
    isAdding = false;


    // Since the school id form control has an async validator, we'll set updateOn to 'blur' so the async validator will only be called
    // when the user exits the input field instead of every time the input field value changes.
    carVinFormControl = new FormControl('', {
        updateOn: 'blur', validators: [Validators.required],
    });
    firstNameFormControl = new FormControl('', [Validators.required]);
    lastNameFormControl = new FormControl('', [Validators.required]);
    emailFormControl = new FormControl('', [Validators.required]);



    /**
     * The constructor for the student list component.
     *
     * @param modalService a dependency injection (DI) for NgbModal
     */
    constructor(private toastr: ToastrService, private apollo: Apollo, private modalService: NgbModal) { }

    /**
     * Called after Angular has fully initialized the component's view. Inits the table.
     */
    ngOnInit(): void {
        console.log("Hits in here goes for toastr");
        // this.toastr.success('Submitted!!', "Updated Successfully..!!", {
        //     timeOut: 2000,
        //   });
        this.retrieveCars(this.page);

    }
    reloadCars(postLoadFunction: () => void): void {
        this.isProcessing = true;
        console.log("Inside Reload Cars");
  
        // console.log("eeeeee PageNumber :  " + this.page + " offset " + (this.page - 1) * this.pageSize);
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
                console.log("After RELOAD");
                this.isProcessing = false;
                this.cars = data.getAllCarsAsc.nodes;
                console.log(this.cars);
                this.totalCount = data.getAllCarsAsc.totalCount;
                console.log("mmmmmmmmdONE reload mmmmmmmmmmm");
                postLoadFunction();
            });
    }
    retrieveCars(pageNum: Number): void {
        this.isProcessing = true;
        console.log("eeeeee PageNumber :  " + this.page + " offset " + (this.page - 1) * this.pageSize);
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
                this.isProcessing = false;
                console.log(data);
                console.log(data.getAllCarsAsc);
                this.cars = data.getAllCarsAsc.nodes;
                this.totalCount = data.getAllCarsAsc.totalCount;
                console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmm" + data.getAllCarsAsc.totalCount);


            });

    }
    searchByModel():void{
        console.log("Came Herrrrre..")
        this.retrieveFilteredCars(this.page);
    }

    retrieveFilteredCars(pageNum: Number): void {
        this.isProcessing = true;
        console.log("Came Herrrrre.2222.")
        console.log("eeeeee PageNumber offset " + (this.page - 1) * this.pageSize+"tdd");
 
        this.apollo.watchQuery<any>({
            query: GET_CARS_FILTERED_WITH_PAGINATION,
            variables: {
                first: this.pageSize,
                offset: (this.page - 1) * this.pageSize,
                orderBy: 'MANUFACTURED_DATE_ASC',
                carModel:this.carModel
            }
        })
            .valueChanges
            .subscribe(({ data, loading }) => {
                this.isProcessing = false;
                console.log(data);
                console.log(data.getAllCarsFilteredAsc);
                this.cars = data.getAllCarsFilteredAsc.nodes;
                this.totalCount = data.getAllCarsFilteredAsc.totalCount;
                console.log("mmmmQQQQQQQQQQQQQQQQQQQ  " + data.getAllCarsFilteredAsc.totalCount);


            });

    }









    /**
     * Returns true if a filter is applied to this column.
     *
     * @param column the column to check
     */
    // qqqqq
    // isColumnFiltered(column: string): boolean {
    //     return this.tableFilters.has(column);
    // }

    /**
     * Returns the class to apply to the table column header based on whether or not it is filtered.
     *
     * @param column the column
     */
    //qqqqqqqqq getColumnFilterClass(column: string): string {
    //     if (this.isColumnFiltered(column)) {
    //         return 'column-filtered';
    //     }

    //     return 'column-not-filtered';
    // }

    /**
     * Called when the filter icon is clicked for a column. Opens the filter dialog for the column.
     *
     * @param parentElement the td element for the column
     * @param column the column
     * @param title the title for the dialog
     */
    //qqqqqqqqqqqqq openTextFilterDialog(parentElement: any, column: string, title: string) {

    //     // Get location of parent element so we can position the filter dialog right below it
    //     const parentRect = parentElement.getBoundingClientRect();

    //     // If the field is already filtered then initialize the filter dialog to the filtered operator and value.
    //     // Otherwise, initialize it to default operator and blank value.
    //     let filter: TableFilter;
    //     if (this.isColumnFiltered(column)) {
    //         filter = this.tableFilters.get(column);
    //     } else {
    //         filter = new TableFilter();
    //         filter.field = column;
    //         filter.operator = 'Is equal to';
    //         filter.value = '';
    //     }

    //     const modalRef = this.modalService.open(TableFilterTextComponent, { size: 'sm' });
    //     modalRef.componentInstance.title = title;
    //     modalRef.componentInstance.field = column;
    //     modalRef.componentInstance.operator = filter.operator;
    //     modalRef.componentInstance.value = filter.value;

    //     modalRef.result.then((result: TableFilter) => {
    //         if (result.value.length === 0) {
    //             this.tableFilters.delete(result.field);
    //         } else {
    //             this.tableFilters.set(result.field, { field: `${result.field}`, operator: `${result.operator}`, value: `${result.value}` });
    //         }

    //         // Reload the students passing in a post load function that collapses all detail rows
    //         const postLoadFunction = (): void => {  };
    //         this.retrieveCars(this.page);
    //     });
    // }

    /**
     * Returns true if the student is currently being edited.
     *
     * @param studentId the studentId
     */
    isEditingCar(carId: number): boolean {

        return this.editCarId === carId;
    }

    /**
     * Called when the edit icon is clicked for the student. Places the student in edit mode.
     *
     * @param carId the studentId
     */
    onEditClick(carToEdit: Car): void {
        // this.isAdding = false; // exit add mode (if necessary)

        // Set the id of the student that is being edited
        this.editCarId = carToEdit.id;

        // Get the student that is being edited
        // const carToEdit: Car = this.cars.find(c => c.id === carId);



        this.carVinFormControl.setValue(carToEdit.vin);
        this.firstNameFormControl.setValue(carToEdit.firstName);
        this.lastNameFormControl.setValue(carToEdit.lastName);
        this.emailFormControl.setValue(carToEdit.email);
    }

    /**
     * Returns true if update is disabled due to one or more form controls having an invalid value.
     */
    isUpdateDisabled(): boolean {
        // If any of the form controls are invalid, return true so the Update button will be disabled
        if (this.carVinFormControl.invalid || this.firstNameFormControl.invalid ||
            this.lastNameFormControl.invalid || this.emailFormControl.invalid) {
            return true;
        }

        return false;
    }

    /**
     * Called when the update student icon is clicked for a student. Updates the student and refreshes the table.
     *
     * @param studentId the studentId
     */
    onUpdateClick(): void {
        this.isProcessing = true;
        this.apollo.mutate({
            mutation: UPDATE_CAR,
            variables: {

                "id": this.editCarId,
                "firstName": this.firstNameFormControl.value,
                "lastName": this.lastNameFormControl.value,
                "email": this.emailFormControl.value
            }
        }).subscribe(({ data }) => {
            console.log('got data', data);
            this.isProcessing = false;
            this.editCarId = -1;
           
            // this.message = this.message ? this.message : 'This car was updated successfully!';
            this.retrieveCars(this.page);
           
        }, (error) => {
            console.log('Updation Failed', error);
            const modalRef = this.modalService.open(NotificationComponent, { size: 'sm', centered: true });
            modalRef.componentInstance.title = 'Error';
            modalRef.componentInstance.message = "Update Failed";
        });
        // Update the student
        // const student: Student = {
        //     studentId: this.editCarId,
        //     studentSchoolId: `${this.studentSchoolIdFormControl.value}`,
        //     firstName: `${this.firstNameFormControl.value}`,
        //     lastName: `${this.lastNameFormControl.value}`,
        //     studentEmail: `${this.studentEmailFormControl.value}`
        // };

        // this.isProcessing = true;
        // this.studentsHttpClient.updateStudent(student)
        //     .subscribe((rsp: { success: any; error: any; }) => {
        //         this.isProcessing = false;
        //         if (rsp.success) {
        //             // Reload the students passing in a post load function that sets editStudentId = -1
        //             // so the row will exit edit mode
        //             const postLoadFunction = (): void => { this.editStudentId = -1; };
        //             this.retrieveCars(this.page);
        //         } else {
        //             const modalRef = this.modalService.open(NotificationComponent, { size: 'sm', centered: true });
        //             modalRef.componentInstance.title = 'Error';
        //             modalRef.componentInstance.message = rsp.error;
        //         }
        //     });
    }

    /**
     * Called when cancel icon is clicked while a student is being edited. Cancels edit mode.
     *
     * @param studentId the studentId
     */
    onCancelEditClick(): void {
        // Set editStudentId = -1 so the row will exit edit mode
        this.editCarId = -1;
    }


    /**
     * Called when the delete student icon is clicked for a student. Deletes the student and refreshes the table.
     *
     * @param studentId the studentId
     */
    onDeleteClick(deleteCarId: number): void {
        const modalRef = this.modalService.open(ConfirmDialogComponent, { size: 'sm', centered: true });
        modalRef.componentInstance.title = 'Delete';
        modalRef.componentInstance.message = 'Are you sure you want to delete this student?';

        modalRef.result.then((confirmedDelete: boolean) => {
            if (confirmedDelete) {
                console.log("Going to deleteeeee");
                this.isProcessing = true;
                this.apollo.mutate({
                    mutation: DELETE_CAR,
                    variables: {

                        "id": deleteCarId
                    }
                }).subscribe(({ data }) => {
                    console.log(data);
                    const postLoadFunction = (): void => {
                        this.editCarId = -1;
                        console.log("Posload Done Edited..");
                        this.isProcessing = false;
                    };


                    this.reloadCars(postLoadFunction);
                 
                }, (error) => {
                    console.log('Delete Failed', error);
                    const modalRefError = this.modalService.open(NotificationComponent, { size: 'sm', centered: true });
                    modalRefError.componentInstance.title = 'Error';
                    modalRefError.componentInstance.message = "Delete Failed..";
                    this.isProcessing = false;
                });


                // this.studentsHttpClient.deleteStudent(studentId)
                //     .subscribe((rsp: { success: any; error: any; }) => {
                //         this.isProcessing = false;
                //         if (rsp.success) {
                //             // Reload the students passing in a post load function that sets editStudentId = -1
                //             // so the row will exit edit mode
                //             const postLoadFunction = (): void => { this.editStudentId = -1; };
                //             this.retrieveCars(this.page);
                //         } else {
                //             const modalRefError = this.modalService.open(NotificationComponent, { size: 'sm', centered: true });
                //             modalRefError.componentInstance.title = 'Error';
                //             modalRefError.componentInstance.message = rsp.error;
                //         }
                //     });
            }
        });
    }



    /**
     * Called when the page is changed. Reloads the table with the new page.
     */
    onPageChange(): void {
        // Reload the students passing in a post load function that collapses all detail rows
        // const postLoadFunction = (): void => {  };
        this.retrieveCars(this.page);
    }




    /**
     * If the form control has an error, returns the error message.
     *
     * @param formControl the form control
     */
    getErrorMessage(formControl: FormControl): string {
        if (formControl.hasError('required')) {
            return 'You must enter a value';
        }

        if (formControl.hasError('email')) {
            return 'Not a valid email';
        }

        if (formControl.hasError('invalidSchoolId')) {
            return formControl.getError('invalidSchoolId').errorMsg;
        }

        return '';
    }
}
