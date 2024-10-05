import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Procurement } from '../model/procurement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcurementService {

  private baseUrl = 'http://localhost:8084/api/procurements';

  constructor(private http: HttpClient) { }

  getAllProcurements(): Observable<Procurement[]> {
    return this.http.get<Procurement[]>(this.baseUrl);
  }

  addProcurement(procurement: Procurement): Observable<Procurement> {
    return this.http.post<Procurement>(this.baseUrl, procurement);
  }

  updateProcurement(id: number, procurement: Procurement): Observable<Procurement> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Procurement>(url, procurement);
  }

  deleteProcurement(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getProcurementById(id: number): Observable<Procurement> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Procurement>(url);
  }
}
