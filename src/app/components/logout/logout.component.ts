import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  loginState:boolean

  constructor(private authService:AuthService,
              private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
  }

  checkLogin(){
    this.loginState = this.authService.isAuthenticated()
  }
  
  logout(){
    if(this.loginState == true){
      this.localStorageService.remove("token")
    }
  }
}
