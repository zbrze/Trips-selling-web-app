import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { AddTripService } from '../../services/trip.service';

@Component({
  selector: 'app-trips-edit',
  templateUrl: './trips-edit.component.html',
  styleUrls: ['./trips-edit.component.css']
})
export class TripsEditComponent implements OnInit {
  tripList;
  @Input() user
 
 
 
   constructor(private service: AddTripService) { 
   }
   ngOnInit(){
     this.getTrips();
   }
 
   getTrips(){
     this.service.getTrips().pipe(
       map(c => c.map( val => 
         ({id: val.payload.doc.id,...val.payload.doc.data()}))
      )).
     subscribe(x => this.tripList = x,err=>console.log(err));
   }
  
 
 
 }
 