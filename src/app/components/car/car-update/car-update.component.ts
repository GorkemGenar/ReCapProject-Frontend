import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carId:number
  car:Car={carId:0, brandId:0, colorId:0, carName:"", modelYear:0, dailyPrice:0, minRequiredFindexRate:0, description:""}
  carUpdateForm:FormGroup
  brands:Brand[] = []
  colors:Color[] = []
  currentBrandId:number
  currentColorId:number

  constructor(private carService:CarService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private brandService:BrandService,
              private colorService:ColorService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]){
        this.carId=(params['carId']) 
      }
    }) 
    this.getCarById()
    this.createCarUpdateForm()
    this.getBrandsForSelect()
    this.getColorsForSelect()
  }

  getBrandsForSelect(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data
    })
  }

  getColorsForSelect(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data
    })
  } 

  getCarById(){
    this.carService.getCarById(this.carId).subscribe(response =>{
      this.car = response.data
      this.createCarUpdateForm()
      this.getBrandsForSelect()
      this.getColorsForSelect()
    })
  }

  createCarUpdateForm(){    
    this.carUpdateForm = this.formBuilder.group({
      carId:[this.car.carId, Validators.required],
      brandId:["", Validators.required],
      colorId:["", Validators.required],
      carName:[this.car.carName, Validators.required],
      modelYear:[this.car.modelYear, Validators.required],
      dailyPrice:[this.car.dailyPrice, Validators.required],
      description:[this.car.description, Validators.required]
    })
  }

  updateCar(){
    if(this.carUpdateForm.valid){
      let carModel  = Object.assign({}, this.carUpdateForm.value)
      console.log(carModel);
      
      this.carService.updateCar(carModel).subscribe(response =>{
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(["car/list"]);
      });
    }
    else{
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Hatalı Bilgi")
    }
  }
}