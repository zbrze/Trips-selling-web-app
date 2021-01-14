import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { AuthService } from 'src/app/services/auth.service';
import { Trip } from 'src/app/trip';
import { AddTripService } from '../../services/trip.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
trip;
user
inCart
currentRate = 0;
  constructor(
    private route: ActivatedRoute,
    private service: AddTripService,
    private auth : AuthService
    ) { }

  ngOnInit(): void {
    var idRouteTrip  = this.route.snapshot.paramMap.get('id');
    this.getTrip(idRouteTrip);
    this.auth.user$.subscribe(u => this.user = u)
  }

  getTrip(id: string){
    this.service.getTrip(id).pipe(
      map( val => 
        ({id: val.payload.id,...val.payload.data()}))
     ).subscribe(x => this.trip = x,err=>console.log(err));
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

  onRate(newRate: number) {
      let currentRating = (newRate + this.trip.rating * this.trip.votes)/(this.trip.votes + 1)
      this.service.rate(this.trip.id, this.user.uid, currentRating);
  }

  deleteTrip(){
    console.log("deleting trip: ", this.trip.id);
    this.service.delete(this.trip.id);
  }

}
