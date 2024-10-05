import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:8084/api/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseUrl}/list`);
  }

  addProduct(formData: FormData): Observable<Products> {
    return this.http.post<Products>(`${this.baseUrl}/add`, formData);
  }
}
