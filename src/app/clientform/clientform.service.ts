import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientformService {

  constructor(private http: HttpClient) { }

  createClient(name:string, address:string, phone:string ) {

    const postOption = {
      name,
      address,
      phone
    };

    return this.http.post(environment.apiUrl + '/clients', postOption);
  }
}
