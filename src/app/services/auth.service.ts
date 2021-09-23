import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UpdateModel } from '../models/updateModel';
import { UserModel } from '../models/userModel';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44363/api/auth/";

  constructor(private httpClient:HttpClient,
              private localStorageService:LocalStorageService) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login", loginModel)
  }

  loginWithGoogle(){
    return this.httpClient.get(this.apiUrl + "signin-google")
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }

  update(updateModel:UpdateModel):Observable<SingleResponseModel<UserModel>>{
    return this.httpClient.post<SingleResponseModel<UserModel>>(this.apiUrl+"update", updateModel)
  }

  isAuthenticated(){
    if(this.localStorageService.get("token")){
      return true
    }
    else{
      return false
    }
  }
}
