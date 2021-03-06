import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/cardetails';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  constructor(private carService:CarService,
              private toastrService:ToastrService) { }

  cars:CarDetails[] = []
  dataLoaded = false

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.carService.getCarDetails().subscribe(response =>{
      this.cars = response.data
      this.dataLoaded = true
      this.toastrService.success(response.message,"Başarılı")
    },responseError =>{
      if(responseError.error.ValidationErrors.length > 0){
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")       
        }
      }
    })
  }
}
