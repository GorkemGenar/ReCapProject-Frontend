import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MailModel } from '../models/mailModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  apiUrl = "https://localhost:44363/api/mail/";

  constructor(private httpClient:HttpClient) { }
  
  sendMailForResetPassword(email:string):Observable<SingleResponseModel<MailModel>>{
    let newPath = this.apiUrl + "send"
    return this.httpClient.post<SingleResponseModel<MailModel>>(newPath, email)
  }
}
