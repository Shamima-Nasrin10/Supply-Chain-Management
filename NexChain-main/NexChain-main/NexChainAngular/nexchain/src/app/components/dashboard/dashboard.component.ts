import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  totalSupplier!: number;
  totalPaymentAmount!: number;
  productionRecords: any[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getSupplierCount();
    this.getTotalPaymentAmount();
    this.getProductionRecordsWithProductName();
  }

  getSupplierCount(): void {
    this.dashboardService.getTotalSupplier()
      .subscribe(data => {
        this.totalSupplier = data;
      });
  }

  getTotalPaymentAmount(): void {
    this.dashboardService.getTotalPaymentAmount()
      .subscribe(amount => {
        this.totalPaymentAmount = amount;
      });
  }


  getProductionRecordsWithProductName(): void {
    this.dashboardService.getProductionRecordsWithProductName()
      .subscribe(data => {
        this.productionRecords = data.map(record => {
          const productionDate = new Date(record[0].productionDate);
          const sevenDayAgo = new Date();
          sevenDayAgo.setDate(sevenDayAgo.getDate() - 2);
          record.push(productionDate > sevenDayAgo); // Append "new" status to the record
          return record;
        });
        console.log(this.productionRecords); // Optional: Log the data to see the structure
      });
  }

}
