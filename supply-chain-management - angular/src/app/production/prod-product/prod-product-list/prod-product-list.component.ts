import {Component, OnInit} from '@angular/core';
import {ProdProductService} from "../prod-product.service";
import {ProdProduct, ProductionStatus} from "../prodproduct.model";
import {ApiResponse} from "../../../util/api.response";
import {NotifyUtil} from "../../../util/notify.util";
import {MatDialog} from "@angular/material/dialog";
import {WarehouseSelectDialogComponent} from "../../warehouse-select-dialog/warehouse-select-dialog.component";
import {WareHouse} from "../../../warehouse/warehouse/warehouse.model";

@Component({
  selector: 'app-prod-product-list',
  templateUrl: './prod-product-list.component.html',
  styleUrl: './prod-product-list.component.css'
})
export class ProdProductListComponent implements OnInit{
  prodProducts: ProdProduct[] = [];

  constructor(
    private prodProductService: ProdProductService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProdProducts();
  }

  private loadProdProducts(): void {
    this.prodProductService.getAllProductionProducts().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.prodProducts = response.data['productionProducts'];
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  updateStatus(id: number, newStatus: ProductionStatus): void {
    if (newStatus === ProductionStatus.MOVED_TO_WAREHOUSE) {
      const dialogRef = this.matDialog.open(WarehouseSelectDialogComponent, {
        data: { prodProductId: id }
      });

      dialogRef.afterClosed().subscribe((selectedWarehouse: WareHouse) => {
        if (selectedWarehouse) {
          this.prodProductService.updateProductionStatus(id, newStatus, selectedWarehouse.id).subscribe({
            next: (response: ApiResponse) => {
              if (response && response.success) {
                NotifyUtil.success(response);
                this.loadProdProducts();
              } else {
                NotifyUtil.error(response.message);
              }
            },
            error: (error) => {
              NotifyUtil.error(error);
            }
          });
        }
      });
    } else {
      this.prodProductService.updateProductionStatus(id, newStatus).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.success) {
            NotifyUtil.success(response);
            this.loadProdProducts();
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


  // deleteProdProduct(id: number): void {
  //   if (confirm('Are you sure you want to delete this product?')) {
  //     this.prodProductService.deleteProdProduct(id).subscribe({
  //       next: (response: ApiResponse) => {
  //         if (response && response.success) {
  //           NotifyUtil.success(response.message);
  //           this.loadProdProducts();
  //         } else {
  //           NotifyUtil.error(response.message);
  //         }
  //       },
  //       error: (error) => {
  //         NotifyUtil.error(error);
  //       }
  //     });
  //   }
  // }
  protected readonly ProductionStatus = ProductionStatus;
}
