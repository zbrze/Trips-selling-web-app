import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder}  from '@angular/forms';
import { Validators } from '@angular/forms';
import { AddTripService } from '../../services/trip.service';
import {Trip} from '../../trip'

@Component({
  selector: 'app-one-trip',
  templateUrl: './one-trip.component.html',
  styleUrls: ['./one-trip.component.css']
})
export class OneTripComponent {
  tripForm;
  fromDate;
  toDate
  isDate = '^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\\d{4}$';

  constructor(private formBuilder: FormBuilder, 
    private service:AddTripService) {
    this.tripForm = this.formBuilder.group({
      name: ["", Validators.required],
      country: ["", Validators.required],
      from: ["", Validators.pattern(this.isDate)],
      to: ["", Validators.pattern(this.isDate)],
      price : ["",  Validators.pattern("^\\d+\\.\\d{0,2}$")],
      places:["", Validators.required],
      description: [""],
      photoURL: [""],
      rating: 0.0,
      votes: 0,
      inCart: 0
    });
  } 
  getDateFrom(event){
    this.fromDate = new Date(event.value);
  }
  getDateTo(event){
    this.toDate = new Date(event.value);
  }
  onSubmit(data){

    if(this.tripForm.valid){
      var today = new Date();
      if(this.fromDate< today){
        alert("You cant add a past trip");
        return;
      }
      if(this.fromDate >this.toDate){
        alert("Trip cant end before it starts");
        return;
      }
      alert("trip added");
      data.booked = 0;
      data.votes = 0;
      data.rating = 3.0
      data.price = parseFloat(data.price);
      data.photoURL = data.photoURL;
      data.description = data.description;
      data.dateTo = this.toDate;
      data.dateFrom = this.fromDate;
      data.country = data.country;
      data.name = data.name;
      data.places = parseInt(data.places)

      console.log(data)
      this.service.addTrip(data);

      this.tripForm.reset();
    }else{
      alert("Cant submit, invalid data");
      console.log(data);
    }

  }

  ngOnInit(): void {
  }

}
