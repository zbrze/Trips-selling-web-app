import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Trip} from '../trip';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
  @Input() trips : Trip[];
  @Output() tripRemove = new EventEmitter<number>();
  @Output() tripAdd = new EventEmitter<number>();
  showMePartially = false;
  constructor() { }
  showCart(){
    this.showMePartially = ! this.showMePartially
  }
  sumNum(){
    return  this.trips.reduce((sum, trip) => sum + trip.inCart ,0)
  }
  removeFromCart(ID:number){
    this.tripRemove.emit(ID);
    console.log("usuwam wycieczkę z koszyka" + ID);
  }
  bookPlace(ID:number){
    this.tripAdd.emit(ID);
    console.log("dodaję wycieczkę do koszyka" + ID);
  }

}
