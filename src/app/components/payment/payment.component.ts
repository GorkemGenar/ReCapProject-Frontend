import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/cardetails';
import { CreditCard } from 'src/app/models/creditcard';
import { FindexModel } from 'src/app/models/findexModel';
import { CreditCardService } from 'src/app/services/creditcard.service';
import { FindexService } from 'src/app/services/findex.service';
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
  @Input() carDetails:CarDetails[]=[];
  userId:number
  cardNumber:string
  findexRate:FindexModel[] = []
  findexRateOfUser:number=0
  findexRateOfCar:number=0
  expirationDate:string
  cvv:string
  creditCards:CreditCard[] = []
  date:string = "2021"
  cardInHand:CreditCard = {id:0, userId:0, cardNumber:"", expirationDate:"", cvv:""}

  constructor(private creditCardService:CreditCardService,
              private paymentService:PaymentService,
              private toastrService:ToastrService,
              private rentalService:RentalService,
              private findexService:FindexService) { }

  ngOnInit(): void {
    this.getCreditCards()
  }

  getCreditCards(){
    this.creditCardService.getCards().subscribe(card =>{
      this.creditCards = card.data
    })
  }
  
  checkTheCreditCard(){
    let creditcard = { userId: this.userId, cardNumber:this.cardNumber, expirationDate:this.expirationDate, cvv:this.cvv}
    
    this.carDetails.forEach(element => {
      this.findexRateOfCar = element.minRequiredFindexRate
    });

    this.creditCardService.checkTheCreditCard(creditcard)
    .subscribe(
      (response) =>
      {
        if(response.success){
          this.toastrService.info("Kart bilgileri doğru.")
          this.toastrService.clear()
          this.findexService.getFindexByUser(this.userId).subscribe((response) =>{
            if(response.data[0].findexRate > this.findexRateOfCar){
              console.log("kullanıcı findex: "+response.data[0].findexRate);
              console.log("araç findex: "+this.findexRateOfCar);
              this.addPayment()
              this.addRental()
            }
            else{
              this.toastrService.error("Findex puanınız bu aracı kiralamak için yeterli değil.")
              console.log("kullanıcı findex: "+response.data[0].findexRate);
              console.log("araç findex: "+this.findexRateOfCar);
            }
          })
        }
      },
      (error) => 
      {
        console.log(error.error);
        if(error !== null){
          this.toastrService.error("Kart bilgileri yanlış.")
          this.toastrService.clear()
        }  
      }
    );
  }

  addPayment(){
    this.cardInHand = this.creditCards.find(c => c.userId == this.userId)
    let payment = {userId: this.userId, cardId: this.cardInHand.id, date:this.date}
    this.paymentService.addPayment(payment).subscribe(response =>{
      this.toastrService.success("Ödeme işlemi başarı ile gerçekleşti.")
      this.toastrService.clear()
    })
  }

  addRental(){
    let rental = {carId:parseInt(this.carId), customerId:this.userId, rentDate:this.rentDate, returnDate:this.returnDate}
    this.rentalService.addRental(rental).subscribe(response =>{
      //console.log(response);      
      this.toastrService.success("Kiralama işlemi gerçekleşti.")
      this.toastrService.clear()
    },responseError =>{
      console.log(responseError.error);
    })
  }
}
