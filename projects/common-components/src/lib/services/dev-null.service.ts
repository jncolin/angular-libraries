import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LIB_API_URL } from '../lib-config';

@Injectable({
  providedIn: 'root'
})
export class DevNullService {

  constructor(private http: HttpClient, @Inject(LIB_API_URL) private endpoint: string) { }

  bin(message: string): Observable<any> {
      const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
      return this.http.post<any>(`${this.endpoint}/misc/devnull`, { message: message, time: new Date().toISOString() }, { headers: headers });
    }
}
