import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  updateForm: FormGroup
  firstName: string = this.localStorageService.getCurrentUser().firstName
  lastName: string = this.localStorageService.getCurrentUser().lastName
  email: string = this.localStorageService.getCurrentUser().email

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createUpdateForm()        

    //--> SAYFAYI 1 KERE RELOAD EDER.
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } 
    else {
      localStorage.removeItem('foo') 
    }
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      email: [this.email, Validators.required],
      password: ["", Validators.required]
    })
  }

  getCurrentUser() {
    return this.localStorageService.getCurrentUser()
  }

  update() {
    if (this.updateForm.valid) {
      const userId = { id: this.localStorageService.getCurrentUser().id }
      let updateModel = Object.assign(userId, this.updateForm.value)

      this.authService.update(updateModel).subscribe(response => {
        this.toastrService.success(response.message)    
        this.toastrService.info("Tekrar giriş yapmalısınız", "Dikkat")  
        this.localStorageService.remove("token")
        this.localStorageService.removeCurrentUser()
        location.reload();
        this.router.navigate(["/login"]) 
      },
        responseError => {
          this.toastrService.error(responseError.error, "Dikkat");
        }
      )
    }
    else {
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Dikkat")
    }
  }
}
