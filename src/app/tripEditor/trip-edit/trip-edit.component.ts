import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constructor } from 'jquery';
import { AuthService } from '../../services/auth.service';
import { AddTripService } from '../../services/trip.service';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {
  @Input() trip: any;
  @Input() user;

  fromDate;
  toDate
  tripForm = this.form.group({
    country:[Validators.required],
    name:[Validators.required],
    price:[Validators.required],
    places:[Validators.required],
    photoURL: [" "],
    description: []

  })

  constructor(
    private service:AddTripService,
    public auth: AuthService,
    private form: FormBuilder
    ) { 
     }

  ngOnInit(): void {
    //this.auth.user$.subscribe(u => this.user = u);
    this.tripForm.patchValue({
      name: this.trip.name,
      country: this.trip.country,
      photoURL: this.trip.photoURL,
      price: this.trip.price,
      places: this.trip.places,
      description: this.trip.description
    })
    
    this.toDate = this.trip.dateTo;
    this.fromDate = this.trip.dateFrom; 
  }

  getDateFrom(event){
    this.fromDate = new Date(event.value);
  }
  getDateTo(event){
    this.toDate = new Date(event.value);
  }
  resetRating(){
    this.service.resetRating(this.trip.id)
  }

  deleteTrip(){
    console.log("deleting trip: ", this.trip.id )
    this.service.delete(this.trip.id)
    
  }
  onSubmit(){
    if(this.fromDate === undefined) this.fromDate = this.trip.dateFrom.toDate();
    if(this.toDate === undefined) this.toDate = this.trip.dateTo.toDate();
    if(this.tripForm.value.places < this.trip.booked){
      alert("You cant change places to number lesser than booked places")
    }else{
    console.log(this.tripForm.value,this.fromDate, this.toDate);
    this.service.editTrip(this.trip.id, this.tripForm.value, this.fromDate, this.toDate)
  }}

}


