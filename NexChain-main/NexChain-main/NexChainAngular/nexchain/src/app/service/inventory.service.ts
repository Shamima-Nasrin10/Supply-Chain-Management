import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from '../model/inventory.model';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = 'http://localhost:8084/api/inventory'; // Your API base URL

  constructor(private http: HttpClient) { }

  saveInventory(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(`${this.baseUrl}/save`, inventory,{responseType: "json"});
  }

  getInventoryDetails(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.baseUrl}/inventory-details`);
  }

  getStockDetails(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}/stock-details`);
  }
}
