import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetails';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[];
  carDetail:CarDetail;
  currentCar: Car;
  imgUrl ="https://localhost:44320/Images/"
  defaultImage="default.jpg";
  dataLoaded = false;
  filterText:"";
  colors:Color[]
  brands:Brand[]
  currentBrandId:number;
  currentColorId:number;
  
  constructor(private carService:CarService, 
              private activatedRoute:ActivatedRoute, 
              private colorService:ColorService, 
              private brandService:BrandService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"] && !params["colorId"]) {
        this.getColorForFilter();
        this.getBrandForFilter();
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"] && !params["brandId"])
      {
        this.getColorForFilter();
        this.getBrandForFilter();
        this.getCarsByColor(params["colorId"]);
      }
      else if(params["brandId"] && params["colorId"])
      {
        this.getColorForFilter();
        this.getBrandForFilter();
        this.getCarForBrandAndColor(params["brandId"], params["colorId"]);
      }
      else{
        this.getCars();
        this.getColorForFilter();
        this.getBrandForFilter();
      }
      
    console.log(params);  
    })  
  }

  getCars(){
    this.carService.getCars().subscribe(respone =>{
      this.cars = respone.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(respone =>{
      this.cars = respone.data
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(respone =>{
      this.cars = respone.data
      this.dataLoaded = true;
    });
  }

  setCurrentCar(carDetailDto:Car){
    this.currentCar=carDetailDto;
  }

  getColorForFilter(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data;
    })
  }

  getBrandForFilter(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data;
    })
  }

  setCurrentBrand(brandId:number){
    return(this.currentBrandId, brandId===this.currentBrandId?true:false)
  }

  setCurrentColor(colorId:number){
    return(this.currentColorId, colorId===this.currentColorId?true:false)
  }

  getCarForBrandAndColor(brandId:number, colorId:number){
    if(!brandId && !colorId){
      this.toastrService.warning("Filtreleme için renk veya marka seçiniz.")
    }
    else{
      this.carService.getCarForBrandAndColor(brandId, colorId).subscribe(response =>{
        this.cars = response.data;
        this.dataLoaded = true;
        if(this.cars.length>0){
          this.toastrService.success("Araçlar listelendi.");
        }
        else{
          this.toastrService.error("Araç bulunamadı.")
        }
      })
    }
  }
}