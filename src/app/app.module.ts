import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CardetailsComponent } from './components/car/cardetails/cardetails.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { BrandsListComponent } from './components/brand/brands-list/brands-list.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { BrandDeleteComponent } from './components/brand/brand-delete/brand-delete.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarDeleteComponent } from './components/car/car-delete/car-delete.component';
import { ColorDeleteComponent } from './components/color/color-delete/color-delete.component';
import { ColorListComponent } from './components/color/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [ 
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    NaviComponent,
    CardetailsComponent,
    VatAddedPipe,
    FilterPipePipe,
    PaymentComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    BrandsListComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    CarListComponent,
    CarUpdateComponent,
    CarDeleteComponent,
    ColorDeleteComponent,
    ColorListComponent,
    ColorUpdateComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    DatePipe,
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
    //provide - Genel injection kısmı. Tüm serviceler için injection etmiş oluyoruz
    //useClass - Hangi httpinterceptor'ın kullanılacağını belirtir
    //multi - Multiple kullanıma izin verir
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
