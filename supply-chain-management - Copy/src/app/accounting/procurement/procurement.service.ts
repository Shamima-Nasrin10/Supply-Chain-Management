import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../util/api.response";
import {ProcurementModel} from "./procurement.model";

@Injectable({
  providedIn: 'root'
})
export class ProcurementService {

  private apiUrl = 'http://localhost:8080/api/procurement';

  constructor(private http: HttpClient) { }


  getAllProcurements(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/list`);
  }


  saveProcurement(procurement: ProcurementModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/save`, procurement);
  }


  deleteProcurementById(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }
  
}
