import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {

  brandId:number
  brand:Brand={brandId:0, brandName:""}
  brandDeleteForm:FormGroup

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
    this.createBrandDeleteForm()
  }

  getBrandById(){
    this.brandService.getBrandById(this.brandId).subscribe(response =>{
      this.brand = response.data
      this.createBrandDeleteForm();
    })
  }

  createBrandDeleteForm(){   
    this.brandDeleteForm = this.formBuilder.group({
      brandId:[this.brand.brandId],
      brandName:[this.brand.brandName, Validators.required]
    })
  }

  deleteBrand(){
    if(this.brandDeleteForm.valid){
      let brandModel = this.brandDeleteForm.value
      this.brandService.deleteBrand(brandModel).subscribe(response =>{
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(["/brands/list"])
      },responseError =>{
        if(responseError.error.ValidationErrors.length > 0){
          console.log(responseError.error.ValidationErrors);
          for (let i  = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")           
          }          
        }
      })
    }
    else{
      this.toastrService.error("Bilgiler kontrol edin.", "Hatalı Bilgi")
    }   
  }
  
}
