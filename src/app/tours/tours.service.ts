import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  private apiUrl = 'http://localhost:3000/user'; // Replace with your NestJS API endpoint

  constructor(private http: HttpClient) { }

  getTours(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
