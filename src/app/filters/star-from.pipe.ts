import { Pipe, PipeTransform } from '@angular/core';
import {Trip} from '../trip'
@Pipe({
  name: 'starFrom',
  pure: false
})
export class StarFromPipe implements PipeTransform {

  transform(trips: Trip[], star: number): Trip[] {
    if(!star) return trips;
    return trips.filter(a => {
      return a.rating >= star;
    })
  }

}