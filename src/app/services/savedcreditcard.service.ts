import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditcard';
import { CreditCardHashed } from '../models/creditcardhashed';
import { ListResponseModel } from '../models/listReponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SavedCreditCardService {

  apiUrl="https://localhost:44363/api/savedcreditcard/";

  constructor(private httpClient:HttpClient) { }

  getCards():Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  checkTheCreditCard(creditCard:CreditCardHashed):Observable<SingleResponseModel<CreditCard>>{
    let newPath = this.apiUrl + 'checkthecard'
    return this.httpClient.post<SingleResponseModel<CreditCard>>(newPath, creditCard);
  }

  addCreditCard(creditCard:CreditCardHashed):Observable<SingleResponseModel<CreditCard>>{
    let newPath = this.apiUrl + 'add'
    return this.httpClient.post<SingleResponseModel<CreditCard>>(newPath, creditCard)
  }

  getCardByUser(userId:number):Observable<SingleResponseModel<CreditCardHashed>>{
    let newPath = this.apiUrl + "getbyuserid?userid=" + userId
    return this.httpClient.get<SingleResponseModel<CreditCardHashed>>(newPath)
  }

  deleteTheCard(creditCard:CreditCardHashed):Observable<SingleResponseModel<CreditCardHashed>>{
    let newPath = this.apiUrl + "delete"
    return this.httpClient.post<SingleResponseModel<CreditCardHashed>>(newPath, creditCard)
  }

}
