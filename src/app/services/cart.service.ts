import { Injectable } from '@angular/core';
import { CarDetail } from '../models/cardetails';
import { CartItems } from '../models/cartitems';
import { CartItem } from '../models/cartitem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(car:CarDetail){
    let item = CartItems.find(c => c.car.carId === car.carId)
    if(item){
      item.quantity += 1;
    }
    else{
      let carItem = new CartItem();
      carItem.car = car;
      carItem.quantity = 1;
      CartItems.push(carItem);
    }
  }

  removeFromCart(car:CarDetail){
    let item:CartItem = CartItems.find(c => c.car.carId === car.carId)
    CartItems.splice(CartItems.indexOf(item), 1)
  }

  list(){
    return CartItems;
  }
}
