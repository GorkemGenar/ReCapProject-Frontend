import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindexModel } from '../models/findexModel';
import { ListResponseModel } from '../models/listReponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindexService {

  apiUrl = "https://localhost:44363/api/findex/";

  constructor(private httpClient:HttpClient) { }

  getFindexByUser(userId:number):Observable<ListResponseModel<FindexModel>>{
    let newPath = this.apiUrl + "getbyuserid?userid="+userId
    return this.httpClient.get<ListResponseModel<FindexModel>>(newPath)
  }
}
