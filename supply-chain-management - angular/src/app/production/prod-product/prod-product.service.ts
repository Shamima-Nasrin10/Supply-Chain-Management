import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../util/api.response";
import {ProdProduct, ProductionStatus} from "./prodproduct.model";

@Injectable({
  providedIn: 'root'
})
export class ProdProductService {
  private apiUrl = 'http://localhost:8080/api/productionProduct';

  constructor(private http: HttpClient) {
  }

  getAllProductionProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  saveProdProduct(productionProduct: ProdProduct): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, productionProduct);
  }

  updateProductionStatus(id: number, status: ProductionStatus, warehouseId?: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/status/${id}`, null, {
      params: {status, warehouseId: warehouseId?.toString() || ''}
    });
  }

  getProdProductsByWarehouseId(warehouseId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/warehouse/${warehouseId}`);
  }

  getAllMovedToWarehouseProducts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/moved-to-warehouse`);
  }

}
