import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailService } from 'src/app/services/mail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resetthepassword',
  templateUrl: './resetthepassword.component.html',
  styleUrls: ['./resetthepassword.component.css']
})
export class ResetthepasswordComponent implements OnInit {

  resetPasswordForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private mailService: MailService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.createResetPasswordForm()
  }

  createResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      toemail: ["", Validators.required],
    })
  }

  sendMail() {
    this.mailService.sendMailForResetPassword(this.resetPasswordForm.value).subscribe(response => {
      this.toastrService.success("Sıfırlama maili gönderildi", "Başarılı")
    })
  }

}
