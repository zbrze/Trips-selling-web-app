import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder}  from '@angular/forms';
import { Validators } from '@angular/forms';
import {Trip} from '../trip'

@Component({
  selector: 'app-one-trip',
  templateUrl: './one-trip.component.html',
  styleUrls: ['./one-trip.component.css']
})
export class OneTripComponent {
  tripForm;
  @Output() newTrip = new EventEmitter<Trip>();
  @Output() toggleMe = new EventEmitter<boolean>();
  @Input() maxID: number;
  @Input() showMePartially: boolean;
  isDate = '^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\\d{4}$';

  constructor(private formBuilder: FormBuilder) {
    this.tripForm = this.formBuilder.group({
      id: 0,
      name: ["", Validators.required],
      country: ["", Validators.required],
      from: ["", Validators.pattern(this.isDate)],
      to: ["", Validators.pattern(this.isDate)],
      price : ["",  Validators.pattern("^\\d+\\.\\d{0,2}$")],
      places:["", Validators.required],
      description: [""],
      URL: [""],
      rating: 0.0,
      votes: 0,
      inCart: 0
    });
  } 
  
  onSubmit(data){
    if(this.tripForm.valid){
      this.showMePartially = ! this.showMePartially
      data.id = this.maxID + 1;
      data.from = new Date(data.from);
      data.to = new Date(data.to);
      data.price = parseFloat(data.price);
      data.places = parseInt(data.places);
      data.booked = 0;
      var today = new Date();
      if(data.from < today){
        alert("You cant add a past trip");
        return;
      }
      if(data.from > data.to){
        alert("Trip cant end before it starts");
        return;
      }
      console.log(data);
      alert("trip added");
      this.newTrip.emit(data);

      this.tripForm.reset();
      data.appe
    }else{
      alert("Cant submit, invalid data");
      console.log(data);
    }

  }

  ngOnInit(): void {
  }

}
