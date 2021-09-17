import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  apiUrl = "https://localhost:44363/api/mail/";

  constructor(private httpClient:HttpClient) { }
  
  sendMailForResetPassword(email:string):Observable<ResponseModel>{
    let newPath = this.apiUrl + "resetthepassword"
    return this.httpClient.post<ResponseModel>(newPath, email)
  }
}
