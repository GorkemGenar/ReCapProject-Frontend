import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  user: UserModel = { id: 0, firstName: "", lastName: "", email: "", passwordHash: "", passwordSalt: "" }
  userSocial: SocialUser;
  isSignedInByGoogle: boolean;
  currentUserEmail: string = '';

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.setCurrentCustomerEmail()
    this.createLoginForm()
    console.log(this.user = this.localStorageService.getCurrentUser())
  }

  loginByGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.userSocial = user;
      this.localStorageService.set("token", user.idToken)
      this.localStorageService.setCurrentUserFromGoogle(this.userSocial);
      this.isSignedInByGoogle = (user != null);
      console.log(this.userSocial);
      this.router.navigate(["/"])
    });
  }

  logoutByGoogle(): void {
    this.socialAuthService.signOut();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel: LoginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.info(response.message)
        this.localStorageService.set("token", response.data.token)
        this.getUserByMail(loginModel.email)
        this.router.navigate(["/"])
      }, responseError => {
        this.toastrService.error(responseError.error, "Dikkat");
      })
    }
    else {
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Dikkat")
    }
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
}
