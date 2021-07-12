import { CarImage } from "./carimage";

export interface CarDetail{
  carId: number;
  carName: string;
  colorName: string;
  brandName: string;
  dailyPrice: number;
  modelYear: number;
  description: string;
  carImage: CarImage[];
  status?:boolean;
}