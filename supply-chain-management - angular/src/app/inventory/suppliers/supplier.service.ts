import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierModel } from './model/supplier.model';
import { ApiResponse } from '../../util/api.response';

@Injectable({
  providedIn: 'root'
})
export class SupplierService{

  private apiUrl = 'http://localhost:8080/api/supplier';  

  constructor(private http: HttpClient) { }
 
  getAllRawMaterialSuppliers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

 
  saveRawMaterialSupplier(supplier: SupplierModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, supplier);
  }

  
  deleteRawMaterialSupplier(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }

  
  getRawMaterialSupplierById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  
  updateRawMaterialSupplier(supplier: SupplierModel): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, supplier);
  }
}
