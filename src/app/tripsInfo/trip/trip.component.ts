import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Trip} from '../../trip';
import { CommonModule } from '@angular/common';
import {RatingModule} from 'ng-starrating';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StarRatingComponent } from 'ng-starrating';
import { AddTripService } from '../../services/trip.service';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/internal/operators/map';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent {
  @Input() trip: any;
  @Input() colorBG: string;
  user

  constructor(
    private service:AddTripService,
    public auth: AuthService
    ) {  }

  ngOnInit(): void {
    this.auth.user$.subscribe(u => this.user = u)
    
  }

  bookTrip(){
    if(this.auth.canRead(this.user)){
    console.log("booking trip: ",this.trip.id, this.user.uid);
    this.service.book(this.trip.id, this.user.uid);
    }else{
      alert("Only logged users can book trips")
    }
  }

  resign(){
    if(this.auth.canRead(this.user)){
      let toResign
    this.service.getBookedTrips(this.trip.id, this.user.uid).pipe(
      take(1),
      map(x => x.map(z =>{
       console.log(z.payload.doc.id)
       this.service.resign(this.trip.id, z.payload.doc.id, this.user.uid);
    
    }
    ))).subscribe(p => toResign = p)
    console.log("resign from: ",this.trip.id); 
  }
    else{
      alert("Only logged users can book trips")
    }
  }

}
