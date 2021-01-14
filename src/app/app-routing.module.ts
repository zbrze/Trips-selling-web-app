import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { OneTripComponent } from './tripEditor/one-trip/one-trip.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TripDetailsComponent } from './tripsInfo/trip-details/trip-details.component';
import { TripComponent } from './tripsInfo/trip/trip.component';
import { TripsComponent } from './tripsInfo/trips/trips.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'trips', component: TripsComponent },
  { path: 'addTrip', component: OneTripComponent},
  { path: 'cart/:id', component: CartComponent, canActivate:[AuthGuard]},
  { path: 'details/:id', component:TripDetailsComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'admin/:id', component: AdminComponent, canActivate:[AdminGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
