import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Trip} from '../trip'
@Component({
  selector: 'app-trip-in-cart',
  templateUrl: './trip-in-cart.component.html',
  styleUrls: ['./trip-in-cart.component.css']
})
export class TripInCartComponent implements OnInit {
  @Output() RemoveTrip = new EventEmitter<number>();
  @Output() AddTrip = new EventEmitter<number>();
  @Input() trip: Trip;
  constructor() { }

  ngOnInit(): void {
  }

  onRemove(){
    console.log("id wycieczki:" + this.trip.id);
    this.RemoveTrip.emit(this.trip.id);
  }
  onAdd(){
    console.log("id wycieczki:" + this.trip.id);
    this.AddTrip.emit(this.trip.id);
  }

}
