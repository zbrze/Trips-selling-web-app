import { Injectable } from '@angular/core';
import{mockTrips} from './mockTrips'
@Injectable({
  providedIn:'root'
})
export class AddTripService {

  constructor() { }

  getTrip(){
    return mockTrips;
  }
}
