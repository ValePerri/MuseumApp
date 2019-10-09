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
    
    public logout(): void {
       
    }
  }

    

    

