import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../types/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = 'https://asm-web-503.vercel.app/categories/';
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor( private httpClient: HttpClient) { }
  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url);
  }
  // getDetail(id: string): Observable<Category> {
  //   return this.httpClient.get<Category>(this.url + id);
  // }
  // create(user: Category): Observable<any> {
  //   return this.httpClient.post(this.url, JSON.stringify(user), this.httpOptions);
  // }
  // update(id: string, user: Category): Observable<any> {
  //   return this.httpClient.put(this.url + id, JSON.stringify(user), this.httpOptions);
  // }
  // delete(id: string): Observable<any> {
  //   return this.httpClient.delete(this.url + id);
  // }
}
