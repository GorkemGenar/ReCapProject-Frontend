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
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color/color-delete/color-delete.component';
import { ColorListComponent } from './components/color/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", component:CarComponent},

  {path:"car", component:CarComponent},
  
  {path:"car/brand/:brandId", component:CarComponent},
  
  {path:"car/color/:colorId", component:CarComponent},
  
  {path:"car/car-details/:carId", component:CardetailsComponent},
  
  {path:"car/brand/:brandId/color/:colorId", component:CarComponent},

  {path:"car/list", component:CarListComponent},

  {path:"car/add", component:CarAddComponent},

  {path:"car/update/:carId", component:CarUpdateComponent},

  {path:"car/delete/:carId", component:CarDeleteComponent},

  {path:"brand/list", component:BrandsListComponent},

  {path:"brand/add", component:BrandAddComponent, canActivate:[LoginGuard]},

  {path:"brand/update/:brandId", component:BrandUpdateComponent},

  {path:"brand/delete/:brandId", component:BrandDeleteComponent},

  {path:"color/list", component:ColorListComponent},

  {path:"color/add", component:ColorAddComponent},

  {path:"color/update/:colorId", component:ColorUpdateComponent},

  {path:"color/delete/:colorId", component:ColorDeleteComponent},

  {path:"payment", component:PaymentComponent},

  {path:"login", component:LoginComponent},

  {path:"register", component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
