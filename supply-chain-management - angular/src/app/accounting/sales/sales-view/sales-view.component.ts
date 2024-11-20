import {Component, OnInit} from '@angular/core';
import {ProcurementModel} from "../../procurement/procurement.model";
import {ProcurementService} from "../../procurement/procurement.service";
import {Router} from "@angular/router";
import {ApiResponse} from "../../../util/api.response";
import {NotifyUtil} from "../../../util/notify.util";
import {SalesModel} from "../model/sales.model";
import {SalesService} from "../sales.service";

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrl: './sales-view.component.css'
})
export class SalesViewComponent implements OnInit{

  salesList: SalesModel[] = [];

  constructor(
    private salesService: SalesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSales();
  }

  private loadSales(): void {
    this.salesService.getAllSales().subscribe({
      next: (apiResponse: ApiResponse) => {
        if (apiResponse && apiResponse.success) {
          this.salesList = apiResponse.data['sales'];
        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this sale?')) {
      this.salesService.deleteSalesById(id).subscribe({
        next: (apiResponse: ApiResponse) => {
          if (apiResponse && apiResponse.success) {
            alert('Sale deleted successfully!');
            this.loadSales(); // Refresh the list after deletion
          } else {
            NotifyUtil.error(apiResponse);
          }
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }

  onEdit(id: number): void {
    this.router.navigate(['/sales-edit', id]); // Ensure this route is configured
  }

}
