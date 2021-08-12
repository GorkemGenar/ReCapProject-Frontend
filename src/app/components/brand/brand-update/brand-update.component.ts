import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand:Brand={brandId:0, brandName:""}
  brandId:number
  brandName:string
  brandUpdateForm:FormGroup

  constructor(private brandService:BrandService,
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]){
        this.brandId=(params['brandId']) 
      }
    }) 
    this.getBrandById()
    this.createBrandUpdateForm()          
  }

  getBrandById(){
    this.brandService.getBrandById(this.brandId).subscribe(response =>{
      this.brand = response.data
      this.createBrandUpdateForm()
    })
  }
  
  createBrandUpdateForm(){   
    this.brandUpdateForm = this.formBuilder.group({
      brandId:[this.brand.brandId],
      brandName:[this.brand.brandName, Validators.required]
    })
  }

  updateBrand(){
    if(this.brandUpdateForm.valid){
      let brandModel  = this.brandUpdateForm.value
      console.log(brandModel);
      this.brandService.updateBrand(brandModel).subscribe(response =>{
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(["/brands/list"]);
      },responseError =>{
        if(responseError.error.ValidationErrors.length > 0){
          console.log(responseError.error.ValidationErrors);
          for (let i  = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")           
          }          
        }
      });
    }
    else{
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Hatalı Bilgi")
    }
  }
}
