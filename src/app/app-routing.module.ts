import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand/brand-delete/brand-delete.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { BrandsListComponent } from './components/brand/brands-list/brands-list.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarDeleteComponent } from './components/car/car-delete/car-delete.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailsComponent } from './components/car/cardetails/cardetails.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", component:CarComponent},

  {path:"cars", component:CarComponent},
  
  {path:"cars/brand/:brandId", component:CarComponent},
  
  {path:"cars/color/:colorId", component:CarComponent},
  
  {path:"cars/car-details/:carId", component:CardetailsComponent},

  {path:"cars/car-list", component:CarListComponent},

  {path:"car/add", component:CarAddComponent},

  {path:"car/update/:carId", component:CarUpdateComponent},

  {path:"car/delete/:carId", component:CarDeleteComponent},
  
  {path:"cars/brand/:brandId/color/:colorId", component:CarComponent},

  {path:"payment", component:PaymentComponent},

  {path:"brand/add", component:BrandAddComponent},

  {path:"brands/list", component:BrandsListComponent},

  {path:"brand/update/:brandId", component:BrandUpdateComponent},

  {path:"brand/delete/:brandId", component:BrandDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
