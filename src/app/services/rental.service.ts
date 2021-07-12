import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  addRental(rental:Rental){
    let newPath = this.apiUrl + 'rentals/add'
    this.httpClient.post(newPath,rental).subscribe()
  }

  removeFromRental(rental:RentalItem){
    RentalItems.splice(RentalItems.indexOf(rental), 1)
  }

  list(){
    return RentalItems;
  }
}
