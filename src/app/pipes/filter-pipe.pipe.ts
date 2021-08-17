import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';
import { CarDetail } from '../models/cardetails';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: CarDetail[], filterTextOfColor: string): CarDetail[] {
    filterTextOfColor = filterTextOfColor ? filterTextOfColor.toLocaleLowerCase() : "" // Arama kutusuna filterText girilmişse küçük harf yap, Yoksa boş geç.
    return filterTextOfColor ? value.filter((b:CarDetail) => b.brandName.toLocaleLowerCase().indexOf(filterTextOfColor) !== -1): value;
  }

}
