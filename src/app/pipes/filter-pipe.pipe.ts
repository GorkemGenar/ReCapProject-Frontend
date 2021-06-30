import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : "" // Arama kutusuna filterText girilmişse küçük harf yap, Yoksa boş geç.
    return filterText ? value.filter((b:Car) => b.brandName.toLocaleLowerCase().indexOf(filterText) !== -1): value;
  }

}
