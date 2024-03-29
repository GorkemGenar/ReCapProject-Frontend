import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Payment } from '../models/payment';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:44363/api/";

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<SingleResponseModel<Payment>>{
    let newPath = this.apiUrl + 'payment/add'
    return this.httpClient.post<SingleResponseModel<Payment>>(newPath,payment).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) { // Bu method dönen hataları yakalamak için
    return throwError(error);             // *(1) Kullanılacağı metodda .pipe() ile eklenir
  }
}
