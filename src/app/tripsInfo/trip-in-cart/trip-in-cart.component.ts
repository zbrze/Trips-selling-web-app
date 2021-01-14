import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/operators';
import { TripInCart } from 'src/app/tripInCart';
import { AddTripService } from '../../services/trip.service';
import {Trip} from '../../trip'
@Component({
  selector: 'app-trip-in-cart',
  templateUrl: './trip-in-cart.component.html',
  styleUrls: ['./trip-in-cart.component.css']
})
export class TripInCartComponent {
  @Input() tripID;
  @Input() count;
  @Input() userID;
  trip: any

  constructor(private service: AddTripService) { }

  ngOnInit(): void {
   console.log("xd",this.tripID, this.count, this.userID)
    this.service.getTrip(this.tripID).pipe(
      map( val => 
        ({id: val.payload.id,...val.payload.data()}))
    ).subscribe(x => this.trip = x,err=>console.log(err));
  }
  
  onRemove(){
    console.log("id wycieczki:" + this.trip.id);
    let toResign
    this.service.getBookedTrips(this.trip.id, this.userID).pipe(
      take(1),
      map(x => x.map(z =>{
       console.log(z.payload.doc.id)
       this.service.resign(this.trip.id, z.payload.doc.id, this.userID);
    
    }
    ))).subscribe(p => toResign = p)
    console.log("resign from: ",this.trip.id); 
  }
  onAdd(){
    console.log("booking trip: ",this.trip.id,  this.userID);
    this.service.book(this.trip.id, this.userID);
  }

}
