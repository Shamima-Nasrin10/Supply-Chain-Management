import {Component, Inject, OnInit} from '@angular/core';
import {ProdProduct} from "../../production/prod-product/prodproduct.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProdProductService} from "../../production/prod-product/prod-product.service";

@Component({
  selector: 'app-warehouse-prodproducts-dialog',
  templateUrl: './warehouse-prodproducts-dialog.component.html',
  styleUrl: './warehouse-prodproducts-dialog.component.css'
})
export class WarehouseProdproductsDialogComponent implements OnInit {
  prodProducts: ProdProduct[] = [];

  constructor(
    private dialogRef: MatDialogRef<WarehouseProdproductsDialogComponent>,
    private prodProductService: ProdProductService,
    @Inject(MAT_DIALOG_DATA) public data: { warehouseId: number }
  ) {}

  ngOnInit(): void {
    this.loadProdProducts();
  }

  private loadProdProducts(): void {
    this.prodProductService.getProdProductsByWarehouseId(this.data.warehouseId).subscribe({
      next: (response) => {
        if (response.success) {
          this.prodProducts = response.data['prodProducts'];
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
