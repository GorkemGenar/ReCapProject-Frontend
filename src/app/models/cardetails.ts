import { Car } from "./car";
import { CarImage } from "./carimage";

export interface CarDetail extends Car{
  brandName:string;
  colorName:string;
  carImage: CarImage[];
  status?:boolean;
}