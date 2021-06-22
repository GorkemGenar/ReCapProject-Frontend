import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carimage';
import { ListResponseModel } from '../models/listReponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimagesService {

  apiUrl = "https://localhost:44363/api/";

  constructor(private httpClient:HttpClient) { }

  getCarImages():Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
