import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = environment.apiUrl + '/auth';
  constructor(private http: HttpClient) { }

  signin(email : string, password : string, rememberMe : boolean): Observable<any> {
    const postOptions = {
      email,
      password
    };

    const response = this.http.post<any>(`${this.apiUrl}/signin`, postOptions);

    response.subscribe(res => {
      if (rememberMe) {
        localStorage.setItem('token', res.access_token);
      } else {
        sessionStorage.setItem('token', res.access_token);
      }
    });

    return response;
  }

  signOut() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  isLogged(): boolean {
    return localStorage.getItem('token') !== null || sessionStorage.getItem('token') !== null;
  }

  getToken(): string {
    return localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  }

  verifyToken(): Observable<any> {
    const response = this.http.get<any>(`${this.apiUrl}/verify`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });

    response.subscribe(res => {
      if (res.status === 401) {
        this.signOut();
      }
    });

    return response;
  }
}
