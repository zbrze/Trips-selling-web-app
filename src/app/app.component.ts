import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wycieczki';
  user
  constructor(
    public auth: AuthService){}
  ngOnInit(): void {
    this.auth.user$.subscribe(u => this.user = u)
  }
}
