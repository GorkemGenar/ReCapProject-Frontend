import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CreditCard } from '../models/creditcard';
import { ListResponseModel } from '../models/listReponseModel';
import { catchError, retry } from 'rxjs/operators';
import { CreditCardHashed } from '../models/creditcardhashed';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl="https://localhost:44363/api/frombankcreditcard/";

  constructor(private httpClient:HttpClient) {}
  
  checkTheCreditCard(creditCard:CreditCard):Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + 'checkthecard'
    return this.httpClient.post<ListResponseModel<CreditCard>>(newPath, creditCard).pipe(catchError(this.handleError)); //(1)
  }

  checkTheSavedCreditCard(creditCard:CreditCardHashed):Observable<ListResponseModel<CreditCardHashed>>{
    let newPath = this.apiUrl + 'checkthesavedcard'
    return this.httpClient.post<ListResponseModel<CreditCardHashed>>(newPath, creditCard).pipe(catchError(this.handleError)); //(1)
  }

  getCards():Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getCardByUserId(userId:number):Observable<SingleResponseModel<CreditCardHashed>>{
    let newPath = this.apiUrl + "getbyuserid?userId=" + userId
    return this.httpClient.get<SingleResponseModel<CreditCardHashed>>(newPath);
  }

  handleError(error: HttpErrorResponse) { // Bu method dönen hataları yakalamak için
    return throwError(error);             // *(1) Kullanılacağı metodda .pipe() ile eklenir
  }
}
