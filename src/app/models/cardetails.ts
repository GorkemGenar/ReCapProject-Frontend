import { Car } from "./car";
import { CarImage } from "./carimage";

export interface CarDetails extends Car{
  brandName:string;
  colorName:string;
  carImage: CarImage[];
  status?:boolean;
}