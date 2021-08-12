import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, timeout } from 'rxjs/operators';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetails';
import { CarImage } from 'src/app/models/carimage';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {

  carDetails:CarDetail[]=[];
  carImages:CarImage[];
  imgUrl:string="https://localhost:44363/images/";  
  carId:number;
  rentals:Rental[]=[];
  dataLoaded = false;
  result:Rental;
  rentDate:Date;
  returnDate:Date;
  customerId:number = 1;
  dateStatus:boolean = false;

  constructor(private carService:CarService, 
              private activatedRoute:ActivatedRoute, 
              private toastrService:ToastrService,
              private rentalService:RentalService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]){
        this.carId=(params['carId']);
        this.getCarDetails(params["carId"])
        this.getRentalByCarId();         
      }
    })
  }

  parentFunction(data:boolean){
    this.dateStatus = data
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response =>{
      this.carDetails=response.data;
      this.carImages=this.carDetails[0].carImage;
    })
  }

  getCurrentImageClass(image: CarImage){
    if (image == this.carImages[0]) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  getButtonClass(image: CarImage){
    if (image == this.carImages[0]) 
    {
      return 'active';
    } else {
      return '';
    }
  }

  getRentalByCarId(){
    this.rentalService.getRentalByCarId(this.carId).subscribe(response =>
    {
      this.rentals = response.data;
      this.dataLoaded = true;
    })
  }

  redirectToPayment(){
    let result:Rental[]=this.rentals
    
    console.log(result);
    
    for(let i = 0; i < result.length; i++)
    {
      if(result)
      {
        if(this.rentDate == null || this.returnDate == null)
        {
          this.toastrService.error("Kiralama veya dönüş tarihi boş olamaz.")
          this.toastrService.clear()
        }
        else
        {
          if(this.rentals[i].returnDate > this.rentDate)
          {
            this.toastrService.warning("Araç kiralamaya uygun değil.")
            this.toastrService.clear()
          }
          else{
            this.toastrService.info("Araç müsait.")
            this.toastrService.clear()
            this.dateStatus = true
          }
        }
      }
      else
      {
        if(this.rentDate == null || this.returnDate == null)
        {
          this.toastrService.error("Kiralama veya dönüş tarihi boş olamaz.")
          this.toastrService.clear()
        }
        else
        {
          this.toastrService.info("Araç müsait.")
          this.toastrService.clear()
          this.dateStatus = true
        }      
      }
    }
  }
}

// Stepper pagedeki ilerleme tuşunu(Kirala) javascript tarafında toastr uyarılarının durumuna göre aktif ettim.
// Bundan dolayı toastr bildirimlerini çağırdıktan sonra clear() fonksiyonu ile aktif olan toastr bildirimini
// kapatmak gerekiyor.
