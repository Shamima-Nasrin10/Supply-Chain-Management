import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductionProduct } from '../model/production-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductionProductService {

  private baseUrl= 'http://localhost:8084/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductionProduct[]> {
    return this.http.get<ProductionProduct[]>(`${this.baseUrl}/`);
  }

  getProductById(id: number): Observable<ProductionProduct> {
    return this.http.get<ProductionProduct>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: ProductionProduct): Observable<ProductionProduct> {
    return this.http.post<ProductionProduct>(`${this.baseUrl}/`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
