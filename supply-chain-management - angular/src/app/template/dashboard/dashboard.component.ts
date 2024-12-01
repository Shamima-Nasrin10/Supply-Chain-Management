/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from "../../util/api.response";
import { DashboardService } from "../dashboard.service";
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  supplierCount: number = 0;
  retailerCount: number = 0;
  productStockData: any[] = [];


  barChartLabels: string[] = ['Suppliers', 'Retailers'];

  barChartData = [
    {
      data: [this.supplierCount, this.retailerCount],
      backgroundColor: [
        'rgb(176,61,73)', // Color for Suppliers
        'rgb(3,155,137)'  // Color for Retailers
      ],
      label: 'Counts'
    }
  ];

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
        ticks: {
          stepSize: 5,
          font: {
            size: 18,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Supplier and Retailer Counts',
        font: {
          size: 18,
        },
      },
    },
  };


  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Stock Distribution',
        font: {
          size: 18
        }
      }
    }
  };


  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  private loadDashboardStats(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.supplierCount = response.data['supplierCount'];
          this.retailerCount = response.data['retailerCount'];
          this.productStockData = response.data['productStock'];

          // Update chart data
          this.barChartData = [
            {
              data: [this.supplierCount, this.retailerCount],
              backgroundColor: [
                'rgb(176,61,73)',
                'rgb(3,155,137)'
              ],
              label: 'Counts'
            }
          ];
          this.updatePieChartData();
        } else {
          console.error(response.message);
        }
      },
      error: (err) => {
        console.error('Failed to load dashboard stats:', err);
      }
    });
  }


  private updatePieChartData(): void {
    this.pieChartLabels = this.productStockData.map(item => item.productName);
    this.pieChartData = this.productStockData.map(item => item.totalStock);
  }

}
