import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8084/api/dashboard'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  getTotalSupplier(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalSupplier`);
  }

  getTotalPaymentAmount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalPaymentAmount`);
  }


  getProductionRecordsWithProductName(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recordsWithProductName`);
  }

}
