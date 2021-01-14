import { Component, OnInit } from '@angular/core';
import {Trip} from '../../trip'
import { NgModule } from '@angular/core';
import {AddTripService} from '../../services/trip.service'
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { User } from '../../user';
@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent{
 tripList;
 cheapID;
 cheapPrice;
 expensivePrice;
 expensiveID;
 fromDate: Date;
 toDate: Date;
 country;
 user: User
 getDateFrom(event){
  this.fromDate = new Date(event.value);
}
getDateTo(event){
  this.toDate = new Date(event.value);
  console.log(this.toDate);
}

  constructor(private service: AddTripService) { 
  }
  ngOnInit(){
    this.getTrips();
    this.onUpdate();
  }

  getTrips(){
    this.service.getTrips().pipe(
      map(c => c.map( val => 
        ({id: val.payload.doc.id,...val.payload.doc.data()}))
     )).
    subscribe(x => this.tripList = x,err=>console.log(err));
  }
  onUpdate(){
    this.service.getExpensive().subscribe(x => x.map(c => this.expensiveID = c.payload.doc.id));
    this.service.getExpensive().subscribe(x => x.map(c => this.expensivePrice = c.payload.doc.data().price));
    this.service.getCheap().subscribe(x => x.map(c => this.cheapID = c.payload.doc.id));
    this.service.getCheap().subscribe(x => x.map(c => this.cheapPrice = c.payload.doc.data().price));
  }


}
