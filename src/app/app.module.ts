import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './tripsInfo/trips/trips.component';
import { OneTripComponent } from './tripEditor/one-trip/one-trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripComponent } from './tripsInfo/trip/trip.component';
import { RatingModule } from 'ng-starrating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountryFilterPipe } from './filters/country-filter.pipe';
import { MaxPriceFilterPipe } from './filters/max-price-filter.pipe';
import { MinPriceFilterPipe } from './filters/min-price-filter.pipe';
import { StartFilterPipe } from './filters/start-filter.pipe';
import { EndFilterPipe } from './filters/end-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { StarFromPipe } from './filters/star-from.pipe';
import { StarToPipe } from './filters/star-to.pipe';
import { CountryListPipe } from './filters/country-list.pipe';
import { TripInCartComponent } from './tripsInfo/trip-in-cart/trip-in-cart.component';
import {CartComponent} from './cart/cart.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { TripDetailsComponent } from './tripsInfo/trip-details/trip-details.component';
import { UserComponent } from './user/user.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import {MatRadioModule} from '@angular/material/radio';
import { TripsEditComponent } from './tripEditor/trips-edit/trips-edit.component';
import { TripEditComponent } from './tripEditor/trip-edit/trip-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    OneTripComponent,
    TripComponent,
    CountryFilterPipe,
    MaxPriceFilterPipe,
    MinPriceFilterPipe,
    StartFilterPipe,
    EndFilterPipe,
    StarFromPipe,
    StarToPipe,
    CountryListPipe,
    TripInCartComponent,
    CartComponent,
    HomeComponent,
    TripDetailsComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    AdminComponent,
    TripsEditComponent,
    TripEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    RatingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),
    AngularFirestoreModule,
    RouterModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
