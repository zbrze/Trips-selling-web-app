
import * as firebase from 'firebase';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
export class Trip{
    id: string;
    name: string;
    country: string;
    dateFrom: any;
    dateTo:any;
    price: number;
    places: number;
    booked: number | firebase.default.firestore.FieldValue ;
    description: string;
    photoURL: string;
    rating: number;
    votes: number| firebase.default.firestore.FieldValue ;
}