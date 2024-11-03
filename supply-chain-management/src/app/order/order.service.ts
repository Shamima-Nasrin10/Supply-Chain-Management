// order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Assuming you've created an Order model

// @Injectable({
//   providedIn: 'root',
// })
// export class OrderService {
//   private apiUrl = 'your_api_url_here'; // Replace with your API endpoint
//
//   constructor(private http: HttpClient) {}
//
//   getOrders(): Observable<Order[]> {
//     return this.http.get<Order[]>(`${this.apiUrl}/orders`);
//   }
//
//   createOrder(order: Order): Observable<Order> {
//     return this.http.post<Order>(`${this.apiUrl}/orders`, order);
//   }
//
//   // Add other methods (update, delete, etc.) as needed
// }
