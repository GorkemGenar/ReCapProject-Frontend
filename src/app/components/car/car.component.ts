import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetails';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  carDetail:CarDetail;
  currentCar: Car;
  imgUrl ="https://localhost:44320/Images/"
  defaultImage="default.jpg";
  dataLoaded = false;
  filterText="";
  
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"])
      {
        this.getCarsByColor(params["colorId"]);
      }
      else{
        this.getCars();
      }
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
}