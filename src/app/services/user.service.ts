import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44363/api/users/";

  constructor(private httpClient:HttpClient) { }

  getUserByEmail(email:string):Observable<SingleResponseModel<UserModel>>{
    let newApiPath = this.apiUrl+ "getbyemail?email=" + email
    return this.httpClient.get<SingleResponseModel<UserModel>>(newApiPath)
  }
}
