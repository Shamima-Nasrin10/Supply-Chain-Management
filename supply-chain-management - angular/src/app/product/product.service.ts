import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './model/product.model';
import {ApiResponse} from "../util/api.response";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  saveProduct(product: Product, imageFile?: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], {type: 'application/json'}));

    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, formData);
  }

  updateProduct(product: Product, imageFile?: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], {type: 'application/json'}));

    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, formData);
  }

  deleteProductById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }

  getProductById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
