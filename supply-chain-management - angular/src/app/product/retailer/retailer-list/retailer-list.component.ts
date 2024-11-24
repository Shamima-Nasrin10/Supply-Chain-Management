import { Component } from '@angular/core';
import {SupplierModel} from "../../../inventory/suppliers/model/supplier.model";
import {SupplierService} from "../../../inventory/suppliers/supplier.service";
import {ApiResponse} from "../../../util/api.response";
import {NotifyUtil} from "../../../util/notify.util";
import {Retailer} from "../model/retailer.model";
import {RetailerService} from "../retailer.service";
import {RetailerCreateDialogComponent} from "../retailer-create-dialog/retailer-create-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'app-retailer-list',
  templateUrl: './retailer-list.component.html',
  styleUrl: './retailer-list.component.css'
})
export class RetailerListComponent {

  retailers: Retailer[] = [];


  constructor(
    private retailerService: RetailerService,
    private dialog: MatDialog,
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit(): void {
    this.loadRetailers();
  }


  private loadRetailers(): void {
    this.retailerService.getAllRetailers().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.retailers = response.data['productRetailers'];
        } else {
          NotifyUtil.error(response);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }


  deleteRetailer(id: number): void {
    if (confirm('Are you sure you want to delete this retailer?')) {
      this.retailerService.deleteRetailerById(id).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.success) {
            NotifyUtil.success(response);
          } else {
            NotifyUtil.error(response);
          }
          this.loadRetailers();
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }

  editRetailer(retailer: Retailer): void {
    const dialogRef = this.dialog.open(RetailerCreateDialogComponent, {
      data: { retailer },
      width: '600px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });
    this.overlayContainer.getContainerElement().style.overflow = 'hidden';

    dialogRef.afterClosed().subscribe((result) => {
      this.overlayContainer.getContainerElement().style.overflow = '';
      if (result) {
        this.loadRetailers();
      }
    });
  }

  addRetailer(): void {
    const dialogRef = this.dialog.open(RetailerCreateDialogComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRetailers();
      }
    });
  }
}
