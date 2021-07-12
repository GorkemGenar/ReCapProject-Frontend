import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", component:CarComponent},
  {path:"cars", component:CarComponent},
  
  {path:"cars/brand/:brandId", component:CarComponent},
  
  {path:"cars/color/:colorId", component:CarComponent},
  
  {path:"cars/car-details/:carId", component:CardetailsComponent},
  
  {path:"cars/brand/:brandId/color/:colorId", component:CarComponent},

  {path:"payment", component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
