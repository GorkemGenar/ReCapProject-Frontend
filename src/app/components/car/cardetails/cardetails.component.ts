import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, timeout } from 'rxjs/operators';
import { Car } from 'src/app/models/car';
import { CarDetails } from 'src/app/models/cardetails';
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

  carDetails:CarDetails[]=[]
  carImages:CarImage[]=[];
  imgUrl:string="https://localhost:44363/images/";  
  carId:number;
  rentals:Rental[]=[];
  dataLoaded = false;
  result:Rental;
  rentDate:string;
  returnDate:string;
  customerId:number = 1;
  dateStatus:boolean = false;

  constructor(private carService:CarService,
              private activatedRoute:ActivatedRoute,
              private toastrService:ToastrService,
              private rentalService:RentalService,
              private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]){
        this.carId = params['carId'];  
      }  
    })
    this.getCarDetailsById()
    this.getRentalByCarId()
  }

  parentFunction(data:boolean){
    this.dateStatus = data
  }

  getCarDetailsById(){
    this.carService.getCarDetailsById(this.carId).subscribe(response =>{
      this.carDetails = response.data;
      this.carImages = response.data[0].carImage
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
    })
  }

  redirectToPayment(){
    let result:Rental[]=this.rentals
    
    if(result.length>0)
    {
      for(let i = 0; i < result.length; i++)
      {
        if(this.rentDate == null || this.returnDate == null)
        {
          this.toastrService.error("Kiralama veya dönüş tarihi boş olamaz.")
        }
        else
        {
          if(this.rentals[i].returnDate > this.rentDate)
          {
            this.toastrService.warning("Araç kiralamaya uygun değil.")
          }
          else{
            this.toastrService.info("Araç müsait.")
            this.dateStatus = true
            this.rentalService.changeDate(this.rentDate, this.returnDate)
            this.router.navigate(["payment/" + this.carId]);
          }
        }
      }
    }
    else
    {
      if(this.rentDate == null || this.returnDate == null)
      {
        this.toastrService.error("Kiralama veya dönüş tarihi boş olamaz.")
      }
      else
      {
        this.toastrService.info("Araç müsait.")
        this.dateStatus = true
        this.rentalService.changeDate(this.rentDate, this.returnDate)
        this.router.navigate(["payment/" + this.carId]);
      }      
    }
  }
}
