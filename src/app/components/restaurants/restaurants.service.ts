import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import {Restaurant} from './restaurant/restaurant.model';
import {MenuItem} from './restaurant-detail/menu-item/menu-item.model';
import {Review} from './restaurant-detail/reviews/reviews.model';
import {RESTAURANT_API} from '../../app.constants';

//import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable()
export class RestaurantsService {
   subj$ = new Subject

    constructor(private http: HttpClient){//',') {,private fireStore: AngularFirestore
    }
    getAllRestaurants(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(`${RESTAURANT_API}`);
   //return this.fireStore.collection('restaurant').valueChanges((d)=>
   // {console.log('restau',d);
      //this.subj$.next(d)
     // return  this.subj$
  //  })
    }

    getMenuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${RESTAURANT_API}/restaurants/${id}/menu`);
    }

    getReviewsOfRestaurants(id: string): Observable<Review> {
        return this.http.get<Review>(`${RESTAURANT_API}/restaurants/${id}/reviews`);
    }
}
