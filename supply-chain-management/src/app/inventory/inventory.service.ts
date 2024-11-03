import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://localhost:3000/inventories';  // JSON Server URL
  constructor(
    private http: HttpClient
  ) { }

  getInventories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getInventoryById(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
