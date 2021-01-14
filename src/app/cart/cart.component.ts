import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Trip} from '../trip';
import { CommonModule } from '@angular/common';
import { AddTripService } from '../services/trip.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TripInCart } from '../tripInCart';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
  trips : string[]
  count
  idRoute
  constructor(private service :AddTripService,
    private route: ActivatedRoute,
    private auth: AuthService) {
      this.trips = []
    }

  ngOnInit(){
    this.idRoute  = this.route.snapshot.paramMap.get('id');
    this.getCart(this.idRoute)
  }

  getCart(id){
    return new Promise(()=>this.service.getCart(id).pipe(
      map(c => c.map( val => 
        (val.payload.doc.data().tripID))
     )).
    subscribe(x => {this.trips = [...new Set(x)], this.count = this.counter(x)} ,err=>console.log(err))) 
    
    
  }
  counter(arr){
    var counts = []
    for (var i = 0; i < arr.length; i++) {
      var num = arr[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts
  }
  sumNum(arr){
    return arr.reduce((sum, a)=> sum + a)
  }
  removeFromCart(ID:number){
    console.log("usuwam wycieczkę z koszyka" + ID);
  }
  bookPlace(ID:number){
    console.log("dodaję wycieczkę do koszyka" + ID);
  }

}
