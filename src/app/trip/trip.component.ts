import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Trip} from '../trip';
import { CommonModule } from '@angular/common';
import {RatingModule} from 'ng-starrating';

import { StarRatingComponent } from 'ng-starrating';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent {
  @Input() trip: Trip;
  @Input() colorBG: string;
  @Output() deleteButton = new EventEmitter<Number>();
  @Output() bookButton = new EventEmitter<Number>();
  @Output() resignButton = new EventEmitter<Number>();
  currentRate = 0

  constructor() { }

  ngOnInit(): void {
  }

  deleteTrip(){
    console.log(this.trip.id);
    this.deleteButton.emit(this.trip.id);
  }

  bookTrip(){
    console.log(this.trip.id);
    this.bookButton.emit(this.trip.id);
  }

  resign(){
    console.log(this.trip.id);
    this.resignButton.emit(this.trip.id);

  }

  onRate(newRate: number) {
    this.trip.rating=(this.trip.rating * this.trip.votes + newRate)/(this.trip.votes+1);
    this.trip.votes +=1;
  }

}
