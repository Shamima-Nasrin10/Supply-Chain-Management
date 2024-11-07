import {Component, OnInit} from '@angular/core';
import {NotifyUtil} from "../../../util/notify.util";
import {ProcurementModel} from "../procurement.model";
import {ProcurementService} from "../procurement.service";
import {Router} from "@angular/router";
import {ApiResponse} from "../../../util/api.response";

@Component({
  selector: 'app-procurement-list',
  templateUrl: './procurement-list.component.html',
  styleUrl: './procurement-list.component.css'
})
export class ProcurementListComponent implements OnInit{
  procurements: ProcurementModel[] = [];

  constructor(
    private procurementService: ProcurementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProcurements();
  }

  private loadProcurements(): void {
    this.procurementService.getAllProcurements().subscribe({
      next: (apiResponse: ApiResponse) => {
        if (apiResponse && apiResponse.success) {
          this.procurements = apiResponse.data['procurements'];
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
    if (confirm('Are you sure you want to delete this procurement?')) {
      this.procurementService.deleteProcurementById(id).subscribe({
        next: (apiResponse: ApiResponse) => {
          if (apiResponse && apiResponse.success) {
            alert('Procurement deleted successfully!');
            this.loadProcurements(); // Refresh the list after deletion
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
    this.router.navigate(['/procurement-edit', id]); // Ensure this route is configured
  }
}
