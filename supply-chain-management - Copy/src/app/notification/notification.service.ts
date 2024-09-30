import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from './model/noification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/notifications'; // URL to JSON server

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  getNotification(id: number): Observable<Notification> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Notification>(url);
  }

  addNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, notification, this.httpOptions);
  }

  updateNotification(notification: Notification): Observable<Notification> {
    const url = `${this.apiUrl}/${notification.id}`;
    return this.http.put<Notification>(url, notification, this.httpOptions);
  }

  deleteNotification(id: number): Observable<Notification> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Notification>(url, this.httpOptions);
  }
}
