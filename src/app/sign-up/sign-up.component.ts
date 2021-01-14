import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms' 
import { Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signForm
  constructor(private formBuilder: FormBuilder,
              private service: AuthService) {
    this.signForm = this.formBuilder.group({
      mail:["", Validators.required],
      password:["", Validators.required],
      vip:[""]
   });
  }

  ngOnInit(): void {
  }
  onSubmit(data){

    if(data.password.toString().length<6){
      alert("too short password - min 6 letters")
    }
    console.log(data.photoURL, data.name)
    console.log("creating account:", data.mail);
    this.service.signUp(data.mail, data.password);
    this.signForm.reset();
  }

}
