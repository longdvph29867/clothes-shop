import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../types/product';
import { Observable } from 'rxjs';
import { LocalService } from '../local/local.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'https://asm-web-503.vercel.app/products/';
  constructor(
    private localService: LocalService,
    private httpClient: HttpClient
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + (this.localService.get()?.accessToken ? this.localService.get()?.accessToken : ''),
    })
  }

  getAll(gender: string = "", category: string = ""): Observable<Product[]> {
    if(category !== '') {
      return this.httpClient.get<Product[]>(this.url + `?category=${category}`);
    }
    if(gender === '') {
      return this.httpClient.get<Product[]>(this.url);
    }
    else {
      return this.httpClient.get<Product[]>(this.url + `?gender=${gender}`);
    }
  }
  getDetail(slug: string): Observable<Product> {
    return this.httpClient.get<Product>(this.url + slug);
  }
  getSame(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.url + `?category_id=${id}`);
  }
  create(user: Product): Observable<any> {
    return this.httpClient.post(this.url, JSON.stringify(user), this.httpOptions);
  }
  update(id: string, user: Product): Observable<any> {
    return this.httpClient.put(this.url + id, JSON.stringify(user), this.httpOptions);
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + id, this.httpOptions);
  }
}
