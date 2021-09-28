import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { RegisterBySocialModel } from 'src/app/models/registerBySocialModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value)

      this.authService.register(registerModel).subscribe(response => {
        this.toastrService.info(response.message)
        localStorage.setItem("token", response.data.token)
        this.router.navigate(["/login"])
      }, responseError => {
        this.toastrService.error(responseError.error, "Dikkat");
      })
    }
    else {
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Dikkat")
      this.toastrService.clear();
    }
  }
  
  registerByGoogle(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe(user =>{
      let userForRegister:RegisterBySocialModel = {id:user.id, firstName:user.firstName, lastName:user.lastName, email:user.email}
      console.log(userForRegister);
      console.log(user);      
      this.authService.registerByGoogle(userForRegister).subscribe(response =>{
        this.toastrService.success(response.message, "Başarılı")
      },responseError =>{
        this.toastrService.error(responseError.error, "Hata")
      })
    })
  }
}