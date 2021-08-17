import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup

  constructor(private formBuilder:FormBuilder,
              private brandService:BrandService,
              private toastrService:ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.createBrandAddForm()
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["", Validators.required]
    })
  }

  addBrand(){
    if(this.brandAddForm.valid)
    {
      let brandModel = Object.assign({}, this.brandAddForm.value)
      this.brandService.addBrand(brandModel).subscribe(data =>{
        this.toastrService.success(data.message, "Başarılı")
        this.router.navigate(["brand/list"]);
      },responseError =>{
        if(responseError.error.ValidationErrors.length>0){
          console.log(responseError.error.ValidationErrors);
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }         
        }
      })
    }
    else{
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Dikkat")
      this.toastrService.clear();
    }
  }
}

