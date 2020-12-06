import { Component, OnInit } from '@angular/core';
import {Trip} from '../trip'
import { NgModule } from '@angular/core';
import {AddTripService} from '../add-trip.service'
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent{
 tripList;
 maxID;
 cheapestID;
 cheapestPrice;
 expensivePrice;
 mExpensiveID;
 showVar: boolean = false;
 searchText:string;
 fromDate: Date;
 toDate: Date;
 country;
 tripToCart: Trip;
 tripsInCart: Trip[];
 toggleChild(){
     this.showVar = !this.showVar;
 }
 getDateFrom(event){
  this.fromDate = new Date(event.value);
  console.log(this.fromDate);
}
getDateTo(event){
  this.toDate = new Date(event.value);
  console.log(this.toDate);
}
  constructor(service: AddTripService) { 
    this.tripList = service.getTrip();
    this.maxID = this.tripList.reduce((a, b) => a.id > b.id ? a : b).id;
    this.onUpdate();
    this.tripsInCart = [];

  }

  onUpdate(){
    this.mExpensiveID = this.tripList.reduce((a, b) => a.price > b.price ? a : b).id;
    this.expensivePrice = this.tripList.reduce((a, b) => a.price > b.price ? a : b).price;
    this.cheapestID = this.tripList.reduce((a, b) => a.price < b.price ? a : b).id;
    this.cheapestPrice = this.tripList.reduce((a, b) => a.price < b.price ? a : b).price;
  }


  onSubmit(trip: Trip){
    this.tripList.push(trip);
    this.tripList = Object.create(this.tripList);
    this.onUpdate();
  }

  onDelete(ID: number){
    this.tripList.splice(this.tripList.findIndex(x => x.id === ID), 1);
    this.onUpdate();
    this.tripsInCart.splice(this.tripsInCart.findIndex(x => x.id === ID), 1);
  }

  onBook(ID: number){
    var bookedTrip = this.tripList.findIndex(x => x.id === ID);
    this.tripList[bookedTrip].booked += 1;
    this.tripToCart = this.tripList.filter(({id}) => id == ID);
    var alreadyInCart = this.tripsInCart.filter(({id}) => id == ID);
    if(!alreadyInCart[0]){
      this.tripsInCart.push(this.tripToCart[0]);
    }
    
    this.tripToCart[0].inCart +=1;
  }
  onResign(ID: number){
    var bookedTrip = this.tripList.findIndex(x => x.id === ID);
    this.tripList[bookedTrip].booked -= 1;
    this.tripList[bookedTrip].inCart -= 1;
    if(this.tripList[bookedTrip].inCart == 0){
      this.tripsInCart.splice(this.tripsInCart.findIndex(x => x.id === ID), 1);
    }
  

  }
  
}
