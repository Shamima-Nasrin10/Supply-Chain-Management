import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // State variables for each collapsible section
  isHomeCollapsed = false;
  isDashboardCollapsed = true;
  isOrdersCollapsed = true;
  isAccountCollapsed = true;

  // Toggle functions for each section
  toggleHome() {
    this.isHomeCollapsed = !this.isHomeCollapsed;
  }

  toggleDashboard() {
    this.isDashboardCollapsed = !this.isDashboardCollapsed;
  }

  toggleOrders() {
    this.isOrdersCollapsed = !this.isOrdersCollapsed;
  }

  toggleAccount() {
    this.isAccountCollapsed = !this.isAccountCollapsed;
  }
}
