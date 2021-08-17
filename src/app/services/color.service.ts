import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listReponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44363/api/colors/";

  constructor(private httpClient:HttpClient) { }

  addColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath, color)
  }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  getColorById(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath = this.apiUrl + "getbyid?id=" + colorId
    return this.httpClient.get<SingleResponseModel<Color>>(newPath)
  }

  updateColor(color:Color):Observable<SingleResponseModel<Color>>{
    return this.httpClient.post<SingleResponseModel<Color>>(this.apiUrl + "update", color)
  }

  deleteColor(color:Color):Observable<SingleResponseModel<Color>>{
    return this.httpClient.post<SingleResponseModel<Color>>(this.apiUrl + "delete", color)
  }
}