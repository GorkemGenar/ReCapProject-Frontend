import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/cardetails';
import { CarImage } from 'src/app/models/carimage';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {

  carDetails:CarDetail[]=[];
  carImages:CarImage[];
  carId:number;
  imgUrl:string="https://localhost:44363/images/"

  constructor(private carService:CarService, 
              private activatedRoute:ActivatedRoute, 
              private toastrService:ToastrService,
              private cartService:CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]){
        this.carId=(params['carId']);
        this.getCarDetails(params["carId"])
      }
    })
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response =>{
      this.carDetails=response.data;
      this.carImages=this.carDetails[0].carImage;
    })
  }

  getCurrentImageClass(image: CarImage) {
    if (image == this.carImages[0]) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  getButtonClass(image: CarImage) {
    if (image == this.carImages[0]) {
      return 'active';
    } else {
      return '';
    }
  }

  addToCart(car:CarDetail){
    if(car.carId==1){
      this.toastrService.error("Bu araç kiralanamaz", car.brandName)
    }
    else{
      this.cartService.addToCart(car);
      this.toastrService.success("aracı kiralama işlemi için sepete eklendi.", car.brandName);
    }
  }

}
