import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupForm } from '../../interfaces/signup-form';
import { LoginForm } from '../../interfaces/login-form';
import { bookingForm } from '../../interfaces/booking-form';
import { User } from '../../interfaces/user';
import { StorageService } from '../client/storage.service';
import { Paintings } from '../../interfaces/paintings';
import { feedbackForm } from '../../interfaces/feedback-form';
import { museums } from 'src/app/interfaces/museums';
import { library } from 'src/app/interfaces/library';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpService,
        private storage: StorageService
    ) { }

    public signup(data: SignupForm): Observable<User> {   
        return this.http.post('/users', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    public loginWithCredentials(data: LoginForm): Observable<User> {
       //console.log(data)
       return this.http.post('/login', data, {
          headers: new HttpHeaders({
             'Content-Type': 'application/json'
            })
        });
    }

    public booking(data: bookingForm): Observable<User> { 
        console.log(data)
        return this.http.post('/booking', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    public getPainting(data): Observable<Paintings> { 
        console.log(data)
        return this.http.post('/paintings', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    public feedback(data: feedbackForm): Observable<User> { 
        console.log(data)
        return this.http.post('/rate', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    public getbookings(data): Observable<User> { 
        console.log(data)
        return this.http.post('/getbookings', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    public removebookings(data): Observable<bookingForm> { 
        //console.log(data)
        return this.http.post('/booking/removebooking', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    public getadvice(data):  Observable<museums>{ 
        console.log(data)
        return this.http.post('/advice', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }   

    public getMost(data):  Observable<library>{ 
        console.log(data)
        return this.http.post('/most', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }   
  }

    

    

