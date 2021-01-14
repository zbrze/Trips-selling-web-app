import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/trip';
@Pipe({
  name: 'countryFilter',
  pure: false
})
export class CountryFilterPipe implements PipeTransform {

  transform(trips: Trip[], country:string): Trip[] {
    if(!country) return trips;
    return trips.filter(a => {
      return a.country.toLocaleLowerCase().includes(country.toLocaleLowerCase());
    })
  }

}
