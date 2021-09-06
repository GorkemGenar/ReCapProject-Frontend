import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListResponseModel } from '../models/listReponseModel';
import { Rental } from '../models/rental';
import { RentalItems } from '../models/rentalitems';
import { RentalItem } from '../models/rentitem';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44363/api/";
  public editRentDate:string  = ""
  public editReturnDate:string  = ""
  private rentDateSource = new BehaviorSubject(this.editRentDate)
  private returnDateSource = new BehaviorSubject(this.editRentDate)
  currentRentDate = this.rentDateSource.asObservable()
  currentReturnDate = this.returnDateSource.asObservable()

  constructor(private httpClient:HttpClient) {}

  changeDate(rentDate:string, returnDate:string){
    this.rentDateSource.next(rentDate)
    this.returnDateSource.next(returnDate)
  }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + 'rentals/getall'
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalByCarId(carId:any):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + 'rentals/getbycarid?carId=' + carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'rentals/add'
    return this.httpClient.post<ResponseModel>(newPath,rental).pipe(catchError(this.handleError));
  }

  removeFromRental(rental:RentalItem){
    RentalItems.splice(RentalItems.indexOf(rental), 1)
  }

  list(){
    return RentalItems;
  }

  handleError(error: HttpErrorResponse) { // Bu method dönen hataları yakalamak için
    return throwError(error);             // *(1) Kullanılacağı metodda .pipe() ile eklenir
  }
}
