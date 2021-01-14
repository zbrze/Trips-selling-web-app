import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent{
  user: User
  userList
  persistenceTypes = [ "LOCAL", "SESSION", "NONE"]

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute
  )
  {}
  ngOnInit(){
    var idRoute  = this.route.snapshot.paramMap.get('id');
    this.auth.getUser(idRoute).pipe(map(val => ({uid: val.payload.id,...val.payload.data()}))).subscribe(x => this.user = x)
    this.auth.getUsers().pipe(
      map(c => c.map( val => 
        ({uid: val.payload.doc.id,...val.payload.doc.data()}))
     )).
    subscribe(x => this.userList = x,err=>console.log(err));this.userList
  }
  
  changeRole(role: string, id: string, val:boolean){
    console.log(role, id)
    this.auth.changeRole(role, id, val)
  }

  radioChange(event: MatRadioChange, data) {
    console.log(data);

    this.auth.setPersistence(data)
    
  }
}
