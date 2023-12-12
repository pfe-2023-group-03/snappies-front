import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrl : string = `${environment.apiUrl}/clients`;

  constructor(private readonly http : HttpClient) { }

  getClients() {
    return this.http.get(this.apiUrl);
  }
}
