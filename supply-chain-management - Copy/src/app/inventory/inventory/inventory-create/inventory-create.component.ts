import {Component, OnInit} from '@angular/core';
import { NotifyUtil } from '../../../util/notify.util';
import {ApiResponse} from "../../../util/api.response";
import {InventoryService} from "../inventory.service";
import {Product} from "../../../product/model/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Inventory} from "../model/inventory.model";
import {WareHouse} from "../../../warehouse/warehouse/warehouse.model";
import {WarehouseService} from "../../../warehouse/warehouse.service";
import {ProductService} from "../../../product/product.service";

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrl: './inventory-create.component.css'
})
export class InventoryCreateComponent implements OnInit{
  inventories: Inventory[] = [];
  inventory: Inventory = new Inventory();
  warehouses: WareHouse[] = [];
  products: Product[] = [];

  constructor(
    private inventoryService: InventoryService,
    private warehouseService: WarehouseService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadInventories();
    this.loadWarehouses();
  }

  public loadInventories(): void {
    this.inventoryService.getAllInventories().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.inventories = response.data['inventories'];
          console.log(response)
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public loadInventory(id: number): void {
    this.inventoryService.getInventoryById(id).subscribe({
      next: (response: ApiResponse) => {
        console.log('API Response:', response);
        if (response && response.success) {
          this.inventory = response.data['inventory'];
        } else {
          NotifyUtil.error(response);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public loadWarehouses(): void {
    this.warehouseService.getAllWarehouses().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.warehouses = response.data['warehouses'];
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public loadProductsByInventoryId(inventoryId: number): void {
    this.productService.getProductsByInventoryId(inventoryId).subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.products = response.data['products'];
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public onSubmit(): void {
    // Ensure the warehouse ID is selected before saving or updating
    if (!this.inventory.warehouse || !this.inventory.warehouse.id) {
      NotifyUtil.error('Please select a warehouse before saving the inventory.');
      return;
    }
    // Decide whether to update or create based on the presence of inventoryId
    const inventoryObservable = this.inventory.id
      ? this.inventoryService.updateInventory(this.inventory)
      : this.inventoryService.saveInventory(this.inventory);

    inventoryObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.resetInventoryForm();
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

  public resetInventoryForm(): void {
    // Reset the form for new inventory entry
    this.inventory = new Inventory();
    this.loadInventories();
  }

  public deleteInventory(id: number): void {
    if (confirm('Are you sure you want to delete this inventory?')) {
      this.inventoryService.deleteInventoryById(id).subscribe({
        next: (response: ApiResponse) => {
          if (response.success) {
            this.resetInventoryForm();
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
