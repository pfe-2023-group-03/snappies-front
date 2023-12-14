import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserformService {

  constructor(private http: HttpClient) { }

  createUser(firstname:string, lastname:string, email:string, password:string, role:string ) {

    const postOption = {
      firstname,
      lastname,
      email,
      password,
      role
    };

    return this.http.post(environment.apiUrl + '/users', postOption);

  }
  
}
