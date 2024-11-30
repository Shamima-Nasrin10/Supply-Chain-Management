import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../util/api.response";
import {SalesModel} from "./model/sales.model";

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient) { }


  getAllSales(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }


  saveSales(sales: SalesModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, sales);
  }


  deleteSalesById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }

  updateSales(id: number, sales: SalesModel): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/update/${id}`, sales);
  }

  getSalesById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
