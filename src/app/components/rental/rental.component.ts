import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/cardetails';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:Rental[]=[];
  dataLoaded = false;
  @Input() carDetails:CarDetail[]=[];
  result:Rental;
  rentDate:Date;
  returnDate:Date;

  constructor(private rentalService:RentalService,
              private router: Router,
              private activatedRoute:ActivatedRoute, 
              private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]){
        this.getRentals();
      }
    })
  }

  getRentals(){
    this.rentalService.getRentals()
    .subscribe(response => {
      this.rentals = response.data;
      this.dataLoaded = true;
    })
  }

  redirectToPayment(carId: number){
    let result = this.rentals.find(value => value.carId == carId);
    
    if(result){
      if(this.rentDate == null || this.returnDate == null)
      {
        this.toastrService.error("Kiralama veya dönüş tarihi boş olamaz.")
      }
      else{
        if(result.returnDate > this.rentDate){
          this.toastrService.warning("Araç kiralamaya uygun değil.")
        }
        else{
          this.toastrService.info("Ödeme sayfasına yönlendiriliyor...")
          this.router.navigate(["/payment"]);
        }
      }
    }
    else{
      if(this.rentDate == null || this.returnDate == null){
        this.toastrService.error("Kiralama veya dönüş tarihi boş olamaz.")
      }
      else{
        this.toastrService.info("Ödeme sayfasına yönlendiriliyor...")
        this.router.navigate(["/payment"]);
      }      
    }
    console.log(this.rentDate);
    console.log(this.returnDate);
  }
}