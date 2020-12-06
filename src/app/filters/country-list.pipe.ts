import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../trip'
@Pipe({
  name: 'countryList',
  pure: false
})
export class CountryListPipe implements PipeTransform {

  transform(trips: Trip[], args?: any): string[] {
    const country = (value, index, self) =>{
      return self.indexOf(value) == index;
    }
    return trips.map(a => a.country).filter(country);
  }

}

