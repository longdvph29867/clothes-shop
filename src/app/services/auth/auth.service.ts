import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Register } from '../../types/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://asm-web-503.vercel.app/auth';
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
  constructor(private httpClient: HttpClient) { }
  login(data: Login): Observable<any> {
    return this.httpClient.post<any>(this.url + "/login", JSON.stringify(data), this.httpOptions);
  }
  register(data: Register): Observable<any> {
    return this.httpClient.post<any>(this.url + "/register", JSON.stringify(data), this.httpOptions);
  }
}
