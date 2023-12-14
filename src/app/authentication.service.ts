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
      sessionStorage.setItem('user', JSON.stringify(res.user));
    });

    return response;
  }

  signOut() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  isLogged(): boolean {
    if (this.getToken() && Object.keys(this.getUser()).length !== 0) {
      return true;
    } else {
      this.signOut();
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user') || '{}');
  }
}
