import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Notification } from '../model/noification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotifications().subscribe(notifications => this.notifications = notifications);
  }

  markAsRead(notification: Notification): void {
    notification.status = 'Read';
    this.notificationService.updateNotification(notification).subscribe(() => {
      this.getNotifications();
    });
  }

}
