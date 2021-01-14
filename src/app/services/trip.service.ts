import { Injectable } from '@angular/core';
import{Trip} from '../trip'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import * as firebase from 'firebase';
@Injectable({
  providedIn:'root'
})
export class AddTripService {
  trips: Trip[];
  trip: Trip;
  
  constructor(private db: AngularFirestore) {   }


getTrips() {
    return this.db.collection<Trip>('trips').snapshotChanges();
  }

getTrip(id: string){
    return this.db.collection<Trip>('trips').doc(id).snapshotChanges();
}

getCart(idUser: string){
  return this.db.collection('users').doc(idUser).collection('cart').snapshotChanges();
}

getCartSize(){
  return this.db.collection<Trip>('trips', ref => ref.where("inCart", ">", 0)).get().toPromise().then(s =>{return s.size})
}
getCheap(){
  return this.db.collection<Trip>('trips',ref => ref.orderBy('price').limit(1)).snapshotChanges();
}

getExpensive(){
  return this.db.collection<Trip>('trips',ref => ref.orderBy('price', "desc").limit(1)).snapshotChanges();
}
book(idTrip: string, idUser: string){
  this.db.collection<Trip>('trips').doc(idTrip).update({
    booked: firebase.default.firestore.FieldValue.increment(1)
  });
  /*this.db.collection('users').doc(idUser).collection('cart', ref => ref.where("tripID", "==", idTrip)).get().toPromise().then(function(doc){
    if(doc.empty) {
      console.log("yeeet")
    }
    else{
      console.log("not yeet",doc.size)
    }
  })*/
  this.db.collection('users').doc(idUser).collection('cart').add({
    tripID: idTrip,
    rated: false
  })
}
getBookedTrips(idTrip: string, idUser: string){
  return this.db.collection('users').doc(idUser).collection('cart', ref => ref.where("tripID", "==", idTrip).limit(1)).snapshotChanges()
 
}
resign(idTrip: string, idRes: string, idUser: string){
  this.db.collection('users').doc(idUser).collection('cart').doc(idRes).delete()
  this.db.collection<Trip>('trips').doc(idTrip).update({
    booked: firebase.default.firestore.FieldValue.increment(-1)
  });
}

rate(idTrip: string, idUser: string, currentRating: number){
  
  this.db.collection('users').doc(idUser).collection('cart', ref => ref.where("tripID", "==", idTrip)).get().toPromise().then((doc)=> {
    if(doc.empty) {
      alert("Can't rate trip that doesnt exist in your cart")
    }
    else{
      doc.docChanges().map(x => {
        if(!x.doc.data().rated){
          this.db.collection<Trip>('trips').doc(idTrip).update({
          rating: currentRating,
          votes: firebase.default.firestore.FieldValue.increment(1)
       });
       this.db.collection('users').doc(idUser).collection('cart').doc(x.doc.id).update({
        rated: true
       })
    }else{
      alert("You've already rated this trip")
    }
  })
    }
  })
  
  
}

addTrip(data){
  this.db.collection('trips').add( {
    name: data.name,
    country:data.country,
    price: data.price,
    places: data.places,
    description: data.description,
    photoURL: data.photoURL,
    dateFrom: data.dateFrom,
    dateTo: data.dateTo,
    booked: 0,
    votes: 0,
    rating: 3.0,
    inCart: 0

  } ).then(docRef => {
    console.log("Document written with ID: ", docRef.id);
  })
}

delete(id: string){
  this.db.collection('trips').doc(id).delete();
  this.db.collection('users').get().toPromise().then(u => u.forEach(v => {
    console.log(v.id);
    this.getBookedTrips(id, v.id).pipe(
      map(x => x.map(z =>{
       console.log(z.payload.doc.id)
       this.resign(id, z.payload.doc.id, v.id);
    
    }
    ))).subscribe( x=> {})
  }
  ))
}

resetRating(id: string){
  this.db.collection('trips').doc(id).update({
    rating: 3.0,
    votes: 0
  })
}

editTrip(id: string, data, dateFrom, dateTo){
  this.db.collection('trips').doc(id).update({
    name: data.name.toString(),
    country:data.country.toString(),
    price: data.price,
    places: data.places,
    description: data.description,
    photoURL: data.photoURL,
    dateFrom: dateFrom,
    dateTo: dateTo
  })
}
}




