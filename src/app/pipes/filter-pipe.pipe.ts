import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filterTextOfColor: string): Car[] {
    filterTextOfColor = filterTextOfColor ? filterTextOfColor.toLocaleLowerCase() : "" // Arama kutusuna filterText girilmişse küçük harf yap, Yoksa boş geç.
    return filterTextOfColor ? value.filter((b:Car) => b.brandName.toLocaleLowerCase().indexOf(filterTextOfColor) !== -1): value;
  }

}
