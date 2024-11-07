import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { OrderModel } from './model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // URL to JSON server

  constructor(private http: HttpClient) {}

  // Get all orders
  getOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.apiUrl);
  }

  getOrderById(id: string): Observable<OrderModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<OrderModel>(url);
  }

  // Create a new order
  createOrder(order: OrderModel): Observable<OrderModel> {
    return this.http.post<OrderModel>(this.apiUrl, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Update an existing order
  updateOrder(order: OrderModel): Observable<OrderModel> {
    const url = `${this.apiUrl}/${order.id}`;
    return this.http.put<OrderModel>(url, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Approve an order
  approveOrder(id: string): Observable<OrderModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<OrderModel>(url, { status: 'Approved' }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Reject an order
  rejectOrder(id: string): Observable<OrderModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<OrderModel>(url, { status: 'Rejected' }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Update the manufacturing stage of an order
  updateManufacturingStage(id: string, manufacturingStage: string): Observable<OrderModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<OrderModel>(url, { manufacturingStage }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Delete an order
  deleteOrder(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  placeOrder(order: OrderModel): Observable<OrderModel> {
    // Create a copy of the order to avoid modifying the original object
    const orderToSubmit = {
        ...order,
        id: undefined, // Ensure ID is not set if backend auto-generates it
        status: 'Pending' // Set the default status to 'pending'
    };

    return this.http.post<OrderModel>(this.apiUrl, orderToSubmit).pipe(
        catchError((error) => {
            console.error('Error placing order:', error);
            return throwError(() => new Error('Failed to place order. Please try again.'));
        })
    );
}
}
