import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import {Observable,Observer,Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {tap} from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {User} from './login.model';
import {RESTAURANT_API} from '../../../app.constants';
import 'firebase/auth';
import 'firebase/database';
const config = {
  apiKey: "AIzaSyDfhPo7_yijoGYpd6-kAmegjpF8UtnCq6E",
  authDomain: "project_id.firebaseapp.com",
  databaseURL: "https://pattanapi1.firebaseio.com",
  projectId: "pattanapi1",
  storageBucket: "pattanapi1.appspot.com",
  messagingSenderId: "sender_id"
};
@Injectable()
export class LoginService {
    user: User;
    lastUrl: string;
    loader: boolean = false;
    private
    db: any;
    admin: boolean = false;
    constructor(private http: HttpClient, private router: Router) {

      var app= firebase.initializeApp(config);


        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
    }

   login(email: string, password: string):any{



        return  firebase.auth().signInWithEmailAndPassword(email, password)
          .then((user)=>{


            this.user = {id:user.user.uid,
              name: user.user.displayName,email: email.substring(0, email.indexOf('@')).toLowerCase(),accessToken:user.user.refreshToken
            };
            const subj$ = new Observable(observer => {

              observer.next(this.user);

              observer.complete();

          });
return  subj$

        })

          .catch((error)=> {
            // Handle Errors here.

            console.log('error while signin', error);

            // ...



        });


    }
    login2(email: string, password: string): Observable<User> {
        return this.http
            .post<User>(`${RESTAURANT_API}/login`, {email: email, password: password})
            .pipe(tap(user => this.user = user));
    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)]);
    }

    logout() {
      firebase.auth().signOut().then(()=> {
        this.user = undefined;



      }).catch((error)=> {
        console.log('error while logout', error);
      });

    }
    signUp(name: string, email: string, password: string) {

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user)=>{
        this.loader = false;

        this.user = {
          name: name,
          email:email,id:user.user.uid,accessToken:user.user.refreshToken
        };

        // create user list on firebase

       // this.db.collection("users").doc(this.user.id).set({
      //    name: name,


      //  });


        console.log('register', user);
      })
      .catch((error)=> {
        // Handle Errors here.
        this.loader = false;
        console.log('error while signup', error);

        // ...
      });
    }

}
