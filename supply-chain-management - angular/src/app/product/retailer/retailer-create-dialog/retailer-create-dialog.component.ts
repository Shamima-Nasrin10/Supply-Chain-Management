import {Component, Inject} from '@angular/core';
import {NotifyUtil} from "../../../util/notify.util";
import {Retailer} from "../model/retailer.model";
import {RetailerService} from "../retailer.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-retailer-create-dialog',
  templateUrl: './retailer-create-dialog.component.html',
  styleUrl: './retailer-create-dialog.component.css'
})
export class RetailerCreateDialogComponent {
  retailer: Retailer = new Retailer();
  isEditMode: boolean = false;

  constructor(
    private retailerService: RetailerService,
    private dialogRef: MatDialogRef<RetailerCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.retailer) {
      this.retailer = { ...data.retailer };
      this.isEditMode = true;
    }
  }

  saveOrUpdateRetailer(): void {
    if (this.isEditMode) {
      this.retailerService.updateRetailer(this.retailer).subscribe({
        next: (response) => {
          if (response && response.success) {
            NotifyUtil.success(response);
            this.closeDialog(true);
          } else {
            NotifyUtil.error(response.message || 'Failed to update retailer');
          }
        },
        error: (error) => NotifyUtil.error(error)
      });
    } else {
      this.retailerService.saveRetailer(this.retailer).subscribe({
        next: (response) => {
          if (response && response.success) {
            NotifyUtil.success(response);
            this.closeDialog(true);
          } else {
            NotifyUtil.error(response.message || 'Failed to create retailer');
          }
        },
        error: (error) => NotifyUtil.error(error)
      });
    }
  }

  closeDialog(result: boolean = false): void {
    this.dialogRef.close(result);
  }
}
