import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Trip} from '../trip';
import { CommonModule } from '@angular/common';
import { AddTripService } from '../services/trip.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
  trips;
  count
  constructor(private service :AddTripService ) {
    this.trips = [];
  }

  ngOnInit(){
    this.getCart();
    this.service.getCartSize().then(x => this.count = x.toString());
    console.log()
  }

  getCart(){
    this.service.
    getCart().pipe(
      map(c => c.map( val => 
        ({id: val.payload.doc.id,...val.payload.doc.data()}))
     )).
    subscribe(x => this.trips = x,err=>console.log(err));
  }
  sumNum(){
    console.log(this.trips);
    let x = this.trips.reduce((sum, trip) => trip.inCart.valueOf() ,0)
    if(x>0) return x;
    else{
      return 0;
    }
    console.log(this.trips);
  }
  removeFromCart(ID:number){
    console.log("usuwam wycieczkę z koszyka" + ID);
  }
  bookPlace(ID:number){
    console.log("dodaję wycieczkę do koszyka" + ID);
  }

}
