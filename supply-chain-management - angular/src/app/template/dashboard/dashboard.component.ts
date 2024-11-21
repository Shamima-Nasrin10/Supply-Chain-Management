import {Component, OnInit} from '@angular/core';
import {ApiResponse} from "../../util/api.response";
import {DashboardService} from "../dashboard.service";
import {ChartData, ChartOptions} from "chart.js";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  supplierCount: number = 0;
  retailerCount: number = 0;
  productStock: any[] = [];

  supplierRetailerPieChartData: ChartData<'pie'> = {
    labels: ['Suppliers', 'Retailers'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };

  productStockBarChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: ''
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
          // Update supplier and retailer count
          this.supplierCount = response.data['supplierCount'];
          this.retailerCount = response.data['retailerCount'];
          this.supplierRetailerPieChartData.datasets[0].data = [this.supplierCount, this.retailerCount];

          // Update product stock bar chart data
          this.prepareProductStockBarChart(response.data['productStock']);
        } else {
          console.error(response.message);
        }
      },
      error: (err) => {
        console.error('Failed to load dashboard stats:', err);
      }
    });
  }

  private prepareProductStockBarChart(stockData: any[]): void {
    const warehouseNames: string[] = [];
    const productStockMap: { [key: string]: number[] } = {};

    // Process stock data
    stockData.forEach((item: any) => {
      const warehouseIndex = warehouseNames.indexOf(item.warehouseName);

      // Add warehouse name if not already present
      if (warehouseIndex === -1) {
        warehouseNames.push(item.warehouseName);
      }

      const productName = item.productName;
      const totalStock = item.totalStock;

      if (!productStockMap[productName]) {
        // Initialize product data array to match warehouse length
        productStockMap[productName] = Array(warehouseNames.length).fill(0);
      }

      // Update stock for the corresponding warehouse
      productStockMap[productName][warehouseNames.indexOf(item.warehouseName)] = totalStock;
    });

    // Convert processed data into chart format
    this.productStockBarChartData.labels = warehouseNames;
    this.productStockBarChartData.datasets = Object.keys(productStockMap).map((product) => ({
      label: product,
      data: productStockMap[product],
      backgroundColor: this.getRandomColor(),
    }));
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
