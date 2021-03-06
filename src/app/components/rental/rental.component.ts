import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/cardetails';
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
  @Input() carDetails:CarDetails[]=[];
  result:Rental;
  rentDate:Date;
  returnDate:Date;
  @Output() parentFunction:EventEmitter<any> = new EventEmitter();
  dateStatus:boolean = false;

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
          this.toastrService.info("Araç müsait.")
          //this.router.navigate(["/payment"]);
          this.parentFunction.emit(this.dateStatus = true)
        }
      }
    }
    else{
      if(this.rentDate == null || this.returnDate == null){
        this.toastrService.error("Kiralama veya dönüş tarihi boş olamaz.")
      }
      else{
        this.toastrService.info("Araç müsait.")
        //this.router.navigate(["/payment"]);
        this.parentFunction.emit(this.dateStatus = true)
      }      
    }
    console.log(this.rentDate);
    console.log(this.returnDate);
  }
}