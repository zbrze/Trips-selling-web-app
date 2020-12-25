import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Trip} from '../trip';
import { CommonModule } from '@angular/common';
import {RatingModule} from 'ng-starrating';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StarRatingComponent } from 'ng-starrating';
import { AddTripService } from '../services/trip.service';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent {
  @Input() trip: any;
  @Input() colorBG: string;
  currentRate = 0

  constructor(
    private service:AddTripService
    ) {  }

  ngOnInit(): void {
  }


  bookTrip(){
    console.log("booking trip: ",this.trip.id,  this.trip.dateFrom.toDate());
    this.service.book(this.trip.id);
  }

  resign(){
    if(this.trip.inCart > 0){
    console.log("resign from: ",this.trip.id);
    this.service.resign(this.trip.id);
    }else{
      alert("You have not booked this trip therefore you cannot resign");
    }

  }

  onRate(newRate: number) {
    let currentRating = (newRate + this.trip.rating * this.trip.votes)/(this.trip.votes + 1)
    this.service.rate(this.trip.id, currentRating);
  }

  deleteTrip(){
    console.log("deleting trip: ", this.trip.id);
    this.service.delete(this.trip.id);
  }

}
