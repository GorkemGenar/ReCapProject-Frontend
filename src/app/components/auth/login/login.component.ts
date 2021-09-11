import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  user:UserModel={id:0,firstName:"",lastName:"",email:"",passwordHash:"",passwordSalt:""}
  currentUserEmail: string = '';

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private router: Router,
              private toastrService:ToastrService,
              private userService:UserService,
              private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.setCurrentCustomerEmail()
    this.createLoginForm()
    
     //--> SAYFAYI 1 KERE RELOAD EDER.
     if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } 
    else {
      localStorage.removeItem('foo') 
    }
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel:LoginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.info(response.message)
        this.getUserByMail(loginModel.email)
        this.localStorageService.set("token", response.data.token)
        this.router.navigate(["/"])
      },responseError =>{
        this.toastrService.error(responseError.error,"Dikkat");
      })
    }
    else{
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Dikkat")
      this.toastrService.clear();
    }
  }

  getUserByMail(email:string){
    this.userService.getUserByEmail(email).subscribe(response =>{
      this.user = response.data
      this.localStorageService.setCurrentUser(this.user);      
    })
  }

  setCurrentCustomerEmail() {
    return this.localStorageService.getCurrentUser()
       ? this.currentUserEmail = this.localStorageService.getCurrentUser().email
       : null;
  }

  getCurrentUser():UserModel {    
    return this.localStorageService.getCurrentUser();  
  }
}
