import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Retailer } from './model/retailer.model';
import { ApiResponse } from '../../util/api.response';

@Injectable({
  providedIn: 'root'
})
export class RetailerService {

  private apiUrl = 'http://localhost:8080/api/retailer';

  constructor(private http: HttpClient) { }


  getAllRetailers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }


  saveRetailer(retailer: Retailer): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, retailer);
  }

  deleteRetailerById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }


  getRetailerById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }


  updateRetailer(retailer: Retailer): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/update`, retailer);
  }
}
