import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddTripService } from '../services/trip.service';
import {Trip} from '../trip'
@Component({
  selector: 'app-trip-in-cart',
  templateUrl: './trip-in-cart.component.html',
  styleUrls: ['./trip-in-cart.component.css']
})
export class TripInCartComponent {
  @Input() trip: any;

  constructor(private service: AddTripService) { }

  ngOnInit(): void {
  }

  onRemove(){
    console.log("id wycieczki:" + this.trip.id);
    this.service.resign(this.trip.id);
  }
  onAdd(){
    console.log("id wycieczki:" + this.trip.id);
    this.service.book(this.trip.id)
  }

}
