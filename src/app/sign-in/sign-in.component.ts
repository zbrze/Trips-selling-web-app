import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms' 
import { Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
loginForm;
user
errMsg

  constructor(private formBuilder: FormBuilder,
              public service: AuthService) {
    this.loginForm = this.formBuilder.group({
      mail:["", Validators.required],
      password:["", Validators.required]
   });
  }

  ngOnInit(): void {

    this.service.user$.subscribe(u => this.user = u)
  }

  checkIfLogged(){
    if (this.user === undefined || this.user === null) {
      return false
    }else{return true}
  }

  onSubmit(data){
    console.log("logging in", data.mail);

    this.service.signIn(data.mail, data.password)
    
    this.loginForm.reset();
  }

}
