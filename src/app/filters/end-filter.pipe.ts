
import { Pipe, PipeTransform } from '@angular/core';
import {Trip} from '../trip'
@Pipe({
  name: 'endFilter',
  pure: false
})
export class EndFilterPipe implements PipeTransform {

  transform(trips: Trip[], end: Date): Trip[] {
    if(!end) return trips;
    return trips.filter(a => {
      return a.dateTo <= end;
    })
  }

}
