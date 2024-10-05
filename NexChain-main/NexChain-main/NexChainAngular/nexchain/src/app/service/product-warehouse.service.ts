import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductWareHouse } from '../model/product-warehouse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductWarehouseService {
  
  private apiUrl = 'http://localhost:8084/products';

  private apiUpdateUrl ='http://localhost:8084';



  constructor(private http: HttpClient) { }

  createProduct(product: ProductWareHouse): Observable<ProductWareHouse> {
    return this.http.post<ProductWareHouse>(this.apiUrl, product);


  }

  updateProductStatus(productId: number): Observable<any> {
    const url = `${this.apiUpdateUrl}/${productId}/approve`; // Construct the update status URL
    return this.http.put(url, {}); // Send a PUT request to update the status
  }


  getAllWareDetails(): Observable<ProductWareHouse[]> {
    return this.http.get<ProductWareHouse[]>(`${this.apiUpdateUrl}/allWareDetails`);
  }

}
