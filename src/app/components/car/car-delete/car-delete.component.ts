import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {

  car:Car={carId:0, brandId:0, colorId:0, carName:"", modelYear:0, dailyPrice:0, description:""}
  carId:number
  carDeleteForm:FormGroup
  brand:Brand={brandId:0, brandName:""}
  color:Color={colorId:0, colorName:""}

  constructor(private carService:CarService,
              private brandService:BrandService,
              private colorService:ColorService,
              private activatedRoute:ActivatedRoute,
              private router: Router,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["carId"]){
        this.carId = (params["carId"])
      }
    })
    this.getCarById()
    this.createCarDeleteForm()
    
  }

  getCarById(){
    this.carService.getCarById(this.carId).subscribe(response =>{
      this.car = response.data
      this.createCarDeleteForm()
    })
  }

  // getBrand(){
  //   this.brandService.getBrandById(this.car.brandId).subscribe(response =>{
  //     this.brand = response.data      
  //   })
  // }

  // getColor(){
  //   this.colorService.getColorById(this.car.colorId).subscribe(response =>{
  //     this.color = response.data
  //   })
  // }

  createCarDeleteForm(){        
    this.carDeleteForm = this.formBuilder.group({
      carId:[this.car.carId, Validators.required],
      brandId:[this.car.brandId, Validators.required],
      colorId:[this.car.colorId, Validators.required],
      carName:[this.car.carName, Validators.required],
      modelYear:[this.car.modelYear, Validators.required],
      dailyPrice:[this.car.dailyPrice, Validators.required],
      description:[this.car.description, Validators.required]
    })
  }

  deleteCar(){
    if(this.carDeleteForm.valid){
      let carModel = this.carDeleteForm.value
      this.carService.deleteCar(carModel).subscribe(response =>{
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(["/car/list"])
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
