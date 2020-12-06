import { Pipe, PipeTransform } from '@angular/core';
import {Trip} from '../trip'
@Pipe({
  name: 'maxPriceFilter',
  pure: false
})
export class MaxPriceFilterPipe implements PipeTransform {

  transform(trips: Trip[], price: number): Trip[] {
    if(!price) return trips;
    return trips.filter(a => {
      return a.price <= price;
    })
  }

}

