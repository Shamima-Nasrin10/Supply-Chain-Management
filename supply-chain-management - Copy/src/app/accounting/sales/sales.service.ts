import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sales} from "./model/sales.model";
import {Observable} from "rxjs";
import {ApiResponse} from "../../util/api.response";

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient) {}

  saveSales(sales: Sales): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, sales);
  }

  getAllSales(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }

  getSalesById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  deleteSalesById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }
}
