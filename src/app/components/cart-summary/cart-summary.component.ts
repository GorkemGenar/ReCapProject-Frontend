import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RentalItem } from 'src/app/models/rentitem';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:RentalItem[] = []
  
  constructor(private rentalService:RentalService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems = this.rentalService.list();
  }

  removeFromCart(){
  }
}
