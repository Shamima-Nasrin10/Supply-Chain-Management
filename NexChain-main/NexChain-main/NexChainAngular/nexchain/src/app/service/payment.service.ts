import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8084/api/payments';

  constructor(private http: HttpClient) { }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/alldetails`);
  }

  getPaymentById(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/${paymentId}`);
  }

  savePayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}/save`, payment);
  }

  updatePayment(paymentId: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}/${paymentId}`, payment);
  }

  deletePayment(paymentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${paymentId}`);
  }
}
