import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductionRecords } from '../model/production-records.model';
import { Observable, catchError } from 'rxjs';
import { ProductionProduct } from '../model/production-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductionQuantityService {

  private baseUrl= 'http://localhost:8084/production/produceProduct';
  private baseUrls='http://localhost:8084'

  constructor(private http: HttpClient) { }


  produceProduct(productionData: ProductionRecords): Observable<any> {
    return this.http.post<any>(this.baseUrl, productionData);
  }

  getProducts(): Observable<ProductionProduct[]> {
    return this.http.get<ProductionProduct[]>(`${this.baseUrls}/products/`);
    // Adjust the endpoint based on your backend API
  }

}

