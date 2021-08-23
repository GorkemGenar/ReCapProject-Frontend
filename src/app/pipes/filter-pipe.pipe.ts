import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';
import { CarDetails } from '../models/cardetails';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: CarDetails[], filterTextOfColor: string): CarDetails[] {
    filterTextOfColor = filterTextOfColor ? filterTextOfColor.toLocaleLowerCase() : "" // Arama kutusuna filterText girilmişse küçük harf yap, Yoksa boş geç.
    return filterTextOfColor ? value.filter((b:CarDetails) => b.brandName.toLocaleLowerCase().indexOf(filterTextOfColor) !== -1): value;
  }

}
