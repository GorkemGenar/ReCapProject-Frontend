import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/cardetails';
import { CreditCard } from 'src/app/models/creditcard';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CreditCardService } from 'src/app/services/creditcard.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() carId:any
  @Input() rentDate:Date;
  @Input() returnDate:Date;
  userId:any
  cardNumber:string
  expirationDate:string
  cvv:string
  creditCards:CreditCard[] = []
  date:string = "2021"
  cardInHand:CreditCard = {id:0, userId:0, cardNumber:"", expirationDate:"", cvv:""}

  constructor(private creditCardService:CreditCardService,
              private paymentService:PaymentService,
              private toastrService:ToastrService,
              private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getCreditCards()
    
  }

  deneme(){
    this.cardInHand = this.creditCards.find(c => c.userId == this.userId)
    console.log(this.cardInHand);    
  }

  getCreditCards(){
    this.creditCardService.getCards().subscribe(card =>{
      this.creditCards = card.data
    })
  }
  
  checkTheCreditCard(){
    let creditcard = { userId: parseInt(this.userId), cardNumber:this.cardNumber, expirationDate:this.expirationDate, cvv:this.cvv}    
    this.creditCardService.checkTheCreditCard(creditcard)
    .subscribe(
      (response) =>
      {
        if(response.success){
          this.toastrService.info("Kart bilgileri doğru.")
          this.addPayment()
          this.addRental()
        }
      },
      (error) => 
      {
        console.log(error.error);
        if(error !== null){
          this.toastrService.error("Kart bilgileri yanlış.")
        }  
      }
    );
  }

  addPayment(){
    this.cardInHand = this.creditCards.find(c => c.userId == this.userId)
    let payment = {userId: parseInt(this.userId), cardId: this.cardInHand.id, date:this.date}
    this.paymentService.addPayment(payment).subscribe()
    this.toastrService.success("Ödeme işlemi başarı ile gerçekleşti.")
  }

  addRental(){
    let rental = {carId:parseInt(this.carId), customerId:parseInt(this.userId), rentDate:this.rentDate, returnDate:this.returnDate}
    this.rentalService.addRental(rental).subscribe()
    this.toastrService.success("Kiralama işlemi gerçekleşti.")
  }
}
