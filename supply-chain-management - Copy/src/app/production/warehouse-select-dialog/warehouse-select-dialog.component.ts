import {Component, Inject, OnInit} from '@angular/core';
import {WareHouse} from "../../warehouse/warehouse/warehouse.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WarehouseService} from "../../warehouse/warehouse.service";
import {ApiResponse} from "../../util/api.response";

@Component({
  selector: 'app-warehouse-select-dialog',
  templateUrl: './warehouse-select-dialog.component.html',
  styleUrl: './warehouse-select-dialog.component.css'
})
export class WarehouseSelectDialogComponent implements OnInit {
  warehouses: WareHouse[] = [];

  constructor(
    protected dialogRef: MatDialogRef<WarehouseSelectDialogComponent>,
    private warehouseService: WarehouseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadWarehouses();
  }

  private loadWarehouses(): void {
    this.warehouseService.getAllWarehouses().subscribe({
      next: (response:ApiResponse) => {
        if (response.success) {
          this.warehouses = response.data['warehouses'];
        }
      }
    });
  }

  selectWarehouse(warehouse: WareHouse): void {
    this.dialogRef.close(warehouse);
  }
}
