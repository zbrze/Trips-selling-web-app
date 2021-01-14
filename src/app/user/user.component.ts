import { Component, NgZone, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  constructor(public service: AuthService,
    public router: Router,
    public ngZone: NgZone) { 
      
    }
    signOut(){
      this.service.signOut();
      this.user = null;
      console.log("logging out")
    }
  ngOnInit(): void {
  this.service.user$.subscribe(u => this.user = u)

 /*.pipe(map( val => 
      ({uid: val.payload.id,...val.payload.data()}))
   ).subscribe(x => this.user = x,err=>console.log(err));
   console.log(this.user.uid, "dcsD");
   console.log(this.service.userData.uid)
  }*/
}
}
