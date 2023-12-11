import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

    return this.http.post('http://localhost:3000/users', postOption);

  }
  
}
