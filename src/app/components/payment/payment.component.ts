import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditcard';
import { Payment } from 'src/app/models/payment';
import { CreditCardService } from 'src/app/services/creditcard.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  userId:any
  cardNumber:string
  expirationDate:string
  cvv:string
  creditCards:CreditCard[] = []
  date:string = "2021"
  cardInHand:CreditCard = {id:0, userId:0, cardNumber:"", expirationDate:"", cvv:""}

  constructor(private creditCardService:CreditCardService,
              private paymentService:PaymentService,
              private toastrService:ToastrService) { }

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
}