import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validator, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup
  brands:Brand[] = []
  colors:Color[] = []
  currentBrandId:number;
  currentColorId:number;

  constructor(private formBuilder:FormBuilder,
              private carService:CarService,
              private brandService:BrandService,
              private colorService:ColorService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm()
    this.getBrandsForSelect();
    this.getColorsForSelect();
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

  setCurrentBrand(brandId:number){
    return(this.currentBrandId, brandId===this.currentBrandId?true:false)
  }

  setCurrentColor(colorId:number){
    return(this.currentColorId, colorId===this.currentColorId?true:false)
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["", Validators.required],
      colorId:["", Validators.required],
      carName:["", Validators.required],
      modelYear:["", Validators.required],
      dailyPrice:["", Validators.required],
      description:["", Validators.required],
      //carImage:["", Validators.required]
    })
  }

  addCar(){
   
    if(this.carAddForm.valid)
    {
      let carModel = Object.assign({}, this.carAddForm.value)
      console.log(carModel);
      
      this.carService.addCar(carModel).subscribe(data =>{
        this.toastrService.success(data.message, "Başarılı")
        this.toastrService.clear();
      })
    }
    else{
      this.toastrService.error("Girilen bilgileri kontrol edin.", "Dikkat")
    }
  }

}
