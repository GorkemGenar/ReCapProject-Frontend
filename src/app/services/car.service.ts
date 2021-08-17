import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/cardetails';
import { ListResponseModel } from '../models/listReponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44363/api/cars/";
  
  constructor(private httpClient: HttpClient) {}

  getCars():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getcardetails'
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarById(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "getbyid?id="+carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }
  
  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getcardetailsbybrandid?brandId='+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getcardetailsbycolorid?colorId='+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getcardetails'
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsById(carId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'getcardetailsbycarid?carid=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarForBrandAndColor(brandId:number, colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + 'getbybrandandcolorid?brandId='+brandId+'&colorId='+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  addCar(car:Car):Observable<SingleResponseModel<Car>>{
    return this.httpClient.post<SingleResponseModel<Car>>(this.apiUrl + "add", car )
  }

  updateCar(car:Car):Observable<SingleResponseModel<Car>>{
    return this.httpClient.post<SingleResponseModel<Car>>(this.apiUrl + "update", car)
  }

  deleteCar(car:Car):Observable<SingleResponseModel<Car>>{
    return this.httpClient.post<SingleResponseModel<Car>>(this.apiUrl + "delete", car)
  }
}
