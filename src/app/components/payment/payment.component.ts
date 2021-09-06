import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/cardetails';
import { CreditCard } from 'src/app/models/creditcard';
import { FindexModel } from 'src/app/models/findexModel';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/creditcard.service';
import { FindexService } from 'src/app/services/findex.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { SavedCreditCardService } from 'src/app/services/savedcreditcard.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  carId: any
  carDetails: CarDetails[] = [];
  userId: number
  cardNumber: string
  expirationDate: string
  cvv: string
  creditCards: CreditCard[] = []
  savedCreditCards:CreditCard [] = []
  date: string = "2021"
  rentDate:string
  returnDate:string
  cardInHand: CreditCard = { id: 0, userId: 0, cardNumber: "", expirationDate: "", cvv: "" }
  saveStatus:boolean=false
  findexRate: FindexModel[] = []
  findexRateOfUser: number = 0
  findexRateOfCar: number = 0
  

  constructor(private carService:CarService,
              private activatedRoute:ActivatedRoute,
              private creditCardService: CreditCardService,
              private savedCreditCardService:SavedCreditCardService,
              private paymentService: PaymentService,
              private toastrService: ToastrService,
              private rentalService: RentalService,
              private router: Router,
              private findexService: FindexService) { }

  ngOnInit(): void {    
    this.activatedRoute.params.subscribe(params => {
    if (params["carId"]){
      this.carId = params['carId'];  
      }  
    })

    this.rentalService.currentRentDate.forEach(response =>{
      this.rentDate = response
    })
    this.rentalService.currentReturnDate.forEach(response =>{
      this.returnDate = response
    })

    this.redirectToLoginIfDateIsEmpty()
    this.getCarDetailsById()
    this.getCreditCards()
    this.getSavedCreditCards()
  }

  getCarDetailsById(){
    this.carService.getCarDetailsById(this.carId).subscribe(response =>{
      this.carDetails = response.data;
    })
  }

  getCreditCards() {
    this.creditCardService.getCards().subscribe(card => {
      this.creditCards = card.data
    })
  }

  getSavedCreditCards(){
    this.savedCreditCardService.getCards().subscribe(response =>{
      this.savedCreditCards = response.data
    })
  }

  getSavedCreditCardByUser(userId:number){
    this.savedCreditCardService.getCardByUser(userId).subscribe(response =>{
      
    })
  }

  checkTheCreditCard() {
    let creditcard = { userId: this.userId, cardNumber: this.cardNumber, expirationDate: this.expirationDate, cvv: this.cvv }

    this.carDetails.forEach(element => {
      this.findexRateOfCar = element.minRequiredFindexRate
    });

    this.creditCardService.checkTheCreditCard(creditcard).subscribe((response) => 
    {
      if (response.success) // kart bilgileri doğru ise
      {
        this.savedCreditCardService.checkTheCreditCard(creditcard).subscribe(
          response =>
          {
            if(response.success) // sistemde kayıtlı ise
            {
              this.toastrService.info("Kart sistemde zaten kayıtlı.")
              this.findexService.getFindexByUser(this.userId).subscribe((response) => 
              {
                if (response.data[0].findexRate >= this.findexRateOfCar) 
                {
                  this.addRental()
                }
                else 
                {
                  this.toastrService.error("Findex puanınız bu aracı kiralamak için yeterli değil.", "Hata")
                }
              })
            }
          },
          (error) => 
          {
            if (error !== null && this.saveStatus == true) // kart kayıtlı değil ve kayıt isteniyor ise
            {
              this.savedCreditCardService.addCreditCard(creditcard).subscribe(
                response =>
                {
                  this.toastrService.success(response.message, "Başarılı") // kart kaydedildi
                  this.findexService.getFindexByUser(this.userId).subscribe((response) => 
                  {
                    if (response.data[0].findexRate >= this.findexRateOfCar) // findex puan kontrolü
                    {
                      this.addRental()
                    }
                    else 
                    {
                      this.toastrService.error("Findex puanınız bu aracı kiralamak için yeterli değil.", "Hata")
                    }
                  })
                }
              )
            }
            else if(error !== null) // kart kayıtlı değil ve kayıt istenmiyor ise
            {
              this.findexService.getFindexByUser(this.userId).subscribe((response) => 
              {
                if (response.data[0].findexRate >= this.findexRateOfCar) 
                {
                  this.addRental()
                }
                else 
                {
                  this.toastrService.error("Findex puanınız bu aracı kiralamak için yeterli değil.", "Hata")
                }
              })
            }
          }
        )
      }
    },
    (error) => 
    {
      if (error !== null) {        
        this.toastrService.error(error.error.message, "Hata")
      }
    });
  }

  addPayment() {
    this.cardInHand = this.creditCards.find(c => c.userId == this.userId)
    let payment = { userId: this.userId, cardId: this.cardInHand.id, date: this.date }
    
    this.paymentService.addPayment(payment).subscribe(response => {
      this.toastrService.success(response.message, "Başarılı")
      this.router.navigate(["/"]);
    })
  }

  addRental() {    

    let rental = { carId:parseInt(this.carId), customerId: this.userId, rentDate: this.rentDate, returnDate: this.returnDate }
    
    this.rentalService.addRental(rental).subscribe(response => {
      if (response.success) {
        this.addPayment()
        this.toastrService.success(response.message, "Başarılı")
      }
    }, 
    responseError => 
    {
      this.toastrService.error("Kiralama oluşturulamadı.", "Hata");
      
    })
  }
  
  redirectToLoginIfDateIsEmpty(){
    // Payment sayfasında bir sebepten dolayı sayfa yenilenebilir. Bu durumda rentDate ve returnDate'in 
    // değerleri silineceği için bu değerlerin tekrardan girilmesi yönlendirme işlemi

    if(!this.rentDate || !this.returnDate){
      this.router.navigate(["car/car-details/"+this.carId])
      this.toastrService.info("Kiralama ve dönüş tarihlerini tekrar girin.")
    }
  }

}