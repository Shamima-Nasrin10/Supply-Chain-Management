import {Component, Inject, OnInit} from '@angular/core';
import {Retailer} from "../model/retailer.model";
import {RetailerService} from "../retailer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifyUtil} from "../../../util/notify.util";
import {ApiResponse} from "../../../util/api.response";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrl: './retailer.component.css'
})
export class RetailerComponent implements OnInit{

  retailer: Retailer = new Retailer();
  retailers: Retailer[] = [];

  constructor(
    private retailerService: RetailerService,
    private route: ActivatedRoute,
    protected router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRetailers();
  }

  public loadRetailers(): void {
    this.retailerService.getAllRetailers().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.retailers = response.data['retailers'];
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public openDialog(retailer?: Retailer): void {
    const dialogRef = this.dialog.open(RetailerDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: retailer ? { ...retailer } : new Retailer() // Open dialog with either existing data or a new Retailer instance
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSubmit(result);
      }
    });
  }

  public onSubmit(retailer: Retailer): void {
    const retailerObservable = retailer.id
      ? this.retailerService.updateRetailer(retailer)
      : this.retailerService.saveRetailer(retailer);

    retailerObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.loadRetailers();
          NotifyUtil.success(response);
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public deleteRetailer(id: number): void {
    if (confirm('Are you sure you want to delete this retailer?')) {
      this.retailerService.deleteRetailer(id).subscribe({
        next: (response: ApiResponse) => {
          if (response.success) {
            this.loadRetailers();
            NotifyUtil.success(response);
          } else {
            NotifyUtil.error(response.message);
          }
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }
}

@Component({
  selector: 'retailer-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Edit Retailer' : 'Add Retailer' }}</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>First Name</mat-label>
        <input matInput [(ngModel)]="data.firstName" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Last Name</mat-label>
        <input matInput [(ngModel)]="data.lastName" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="data.email" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Phone</mat-label>
        <input matInput [(ngModel)]="data.phone" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Address Line</mat-label>
        <input matInput [(ngModel)]="data.addressLine" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Postal Code</mat-label>
        <input matInput [(ngModel)]="data.postalCode" required>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="data">{{ data.id ? 'Update' : 'Create' }}</button>
    </mat-dialog-actions>
  `,
})
export class RetailerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RetailerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Retailer,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
