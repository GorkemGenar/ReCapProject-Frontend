import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, interval, Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/userModel';
import { LoginModel } from 'src/app/models/loginModel';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup
  registerForm: FormGroup
  user: UserModel = { id: 0, firstName: "", lastName: "", email: "", passwordHash: "", passwordSalt: "" }
  currentUserEmail: string = ''

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService) { }
    
  ngOnInit(): void {
    this.createLoginForm()
    this.createRegisterForm()    
  }

  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  getUserByMail(email: string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.user = response.data
      this.localStorageService.setCurrentUser(this.user);
      location.reload();
    })
  }

  setCurrentCustomerEmail() {
    return this.localStorageService.getCurrentUser()
      ? this.currentUserEmail = this.localStorageService.getCurrentUser().email
      : null;
  }

  getCurrentUser(): UserModel {
    return this.localStorageService.getCurrentUser();
  }

  setToken(data:any){
    this.localStorageService.set("token", data)
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel: LoginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.info(response.message)
        this.setToken(response.data.token)
        this.getUserByMail(loginModel.email)
      }, responseError => {
        this.toastrService.error(responseError.error, "Dikkat");
      })
    }
    else {
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Dikkat")
      this.toastrService.clear();
    }
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response => {
        this.toastrService.success("Artık giriş yapabilirsiniz.", "Başarılı")
        this.toastrService.info(response.message, "Bilgi")
        location.reload()
      }, responseError => {
        this.toastrService.error(responseError.error, "Dikkat");
      })
    }
    else {
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Dikkat")
      this.toastrService.clear();
    }
  }

  logout() {
    if (this.isAuthenticated()) {
      this.localStorageService.remove("token")
      this.localStorageService.removeCurrentUser()
      window.location.reload()
    }
  }
}
