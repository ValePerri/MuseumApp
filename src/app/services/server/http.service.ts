import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpOptions } from '../../interfaces/http-options';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private readonly api: string;
    
    readonly hostname = '172.19.20.6';
    readonly port = 8080;
    readonly context = 'MuseumApp';

    constructor(
        public http: HttpClient
    ) {
        this.api = `http://${this.hostname}:${this.port}/${this.context}`;
    }

    private body(params: Object): string {
        return JSON.stringify(params);
    }

    public get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
        return this.http.get<T>(`${this.api}${endpoint}`, options);
    }
    
    public post<T>(endpoint: string, params: Object, options?: HttpOptions): Observable<T> {        
        return this.http.post<T>(`${this.api}${endpoint}`, this.body(params), options);
    }

    /*public put<T>(endpoint: string, params: Object, options?: HttpOptions): Observable<T> {
        return this.http.put<T>(`${this.api}${endpoint}`,  this.body(params), options);
    }

    public delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
        return this.http.delete<T>(`${this.api}${endpoint}`, options);
    }*/

    

}
