import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, } from 'rxjs';
import { User } from '../user';
import { map, switchMap, take, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
user$: Observable<User>;

persistence = firebase.default.auth.Auth.Persistence.LOCAL;
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private zone: NgZone,
    private router: Router
  ) { 
    this.user$ = this.auth.authState.pipe(switchMap(user => {
      if (user) {
        return this.db.doc<User>(`users/${user.uid}`).valueChanges()
      
      }
    }))
}
private checkAuthorization(user: User, allowedRoles: string[]): boolean {
  if (!user) return false
  for (const role of allowedRoles) {
    if ( user.role[role] ) {
      return true
    }
  }
  return false
}

setPersistence(choice: string){
  if(choice == "LOCAL"){
    this.persistence = firebase.default.auth.Auth.Persistence.LOCAL;
    console.log("changing to local")
  }else if(choice == "SESSION"){
    this.persistence = firebase.default.auth.Auth.Persistence.LOCAL;
    console.log("changing to session")
  }else{
    this.persistence = firebase.default.auth.Auth.Persistence.NONE
    console.log("changing to none")
  }
}

canRead(user: User): boolean {
  const allowed = ['admin', 'editor', 'reader', 'vip']
  return this.checkAuthorization(user, allowed)
}
canSeeBooked(user: User): boolean {
  const allowed = ['admin', 'editor', 'vip']
  return this.checkAuthorization(user, allowed)
}

canEdit(user: User){
  const allowed = ['admin', 'editor']
  return this.checkAuthorization(user, allowed)
}

canDelete(user: User): boolean {
  const allowed = ['admin']
  return this.checkAuthorization(user, allowed)
}

changeRole(r: string, uid:string, val:boolean){
  const userRef: AngularFirestoreDocument<any> =this.db.collection<User>('users').doc(uid)
  switch(r){
    case "reader":{
      const userData ={
        role: {
          reader: val
        }
      }
      return userRef.set(userData, {
        merge: true
      })
      break;
    }
    case "vip":{
      const userData ={
        role: {
          vip: val
        }
      }
      return userRef.set(userData, {
        merge: true
      })
      break;
    }
    case "editor":{
      const userData ={
        role: {
          editor: val
        }
      }
      return userRef.set(userData, {
        merge: true
      })
      break;
    }
    case "admin":{
      const userData ={
        role: {
          admin: val
        }
      }
      return userRef.set(userData, {
        merge: true
      })
      break;
    }
    default:{
      console.log("wrong data", r)
    }
  }
}
async googleSignin() {
  const provider = new firebase.default.auth.GoogleAuthProvider()
  firebase.default.auth().signInWithPopup(provider)
}
getUser(uid: string){
  return this.db.collection<User>('users').doc(uid).snapshotChanges()
}

getUsers(){
  return this.db.collection<User>('users').snapshotChanges()
}

signIn(email, password){
  this.auth.setPersistence(this.persistence).then(()=>
  this.auth.signInWithEmailAndPassword(email, password).then(r => {
  }
  )).catch(error => console.log(error.message))
}

signUp(email, password){
this.auth.createUserWithEmailAndPassword(email,password).then(r=>
  this.setUser(r.user)).then(()=> this.signIn(email, password)).then(()=> this.router.navigate(['home']))

}

  setUser(user : firebase.default.User){  
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    const userData ={
      uid: user.uid,
      email: user.email,
      role: {
        reader: true,
        vip: false,
        editor: false,
        admin: false
      }
    }
    return userRef.set(userData, {
      merge: true
    })
  } 

  signOut() {
    return this.auth.signOut().then(() => {
      delete this.user$;
      this.router.navigate(['home']);
    }).then(() => window.location.reload())
  }
}
