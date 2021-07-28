import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListResponseModel } from '../models/listReponseModel';
import { Rental } from '../models/rental';
import { RentalItems } from '../models/rentalitems';
import { RentalItem } from '../models/rentitem';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44363/api/";

  constructor(private httpClient:HttpClient) {}

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + 'rentals/getall'
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  addRental(rental:Rental):Observable<Rental>{
    let newPath = this.apiUrl + 'rentals/add'
    return this.httpClient.post<Rental>(newPath,rental).pipe(catchError(this.handleError));
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
