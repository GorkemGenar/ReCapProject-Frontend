import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listReponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44363/api/brands/";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "getall");
  }

  getBrandById(brandId:number):Observable<SingleResponseModel<Brand>>{
    return this.httpClient.get<SingleResponseModel<Brand>>(this.apiUrl + "getbyid?id=" + brandId)
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", brand, )
  }

  updateBrand(brand:Brand):Observable<SingleResponseModel<Brand>>{
    return this.httpClient.post<SingleResponseModel<Brand>>(this.apiUrl + "update", brand)
  }

  deleteBrand(brand:Brand):Observable<SingleResponseModel<Brand>>{
    return this.httpClient.post<SingleResponseModel<Brand>>(this.apiUrl + "delete", brand)
  }
}
