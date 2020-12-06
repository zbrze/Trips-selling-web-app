import { Pipe, PipeTransform } from '@angular/core';
import {Trip} from '../trip'
@Pipe({
  name: 'startFilter',
  pure: false
})
export class StartFilterPipe implements PipeTransform {

  transform(trips: Trip[], start: Date): Trip[] {
    if(!start) return trips;
    return trips.filter(a => {
      return a.dateFrom >= start;
    })
  }

}
