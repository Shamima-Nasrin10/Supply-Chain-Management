import {Component, OnInit} from '@angular/core';
import { NotifyUtil } from '../../../util/notify.util';
import {ApiResponse} from "../../../util/api.response";
import {InventoryService} from "../inventory.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Inventory} from "../model/inventory.model";


@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrl: './inventory-create.component.css'
})
export class InventoryCreateComponent implements OnInit{
  inventories: Inventory[] = [];
  inventory: Inventory = new Inventory();

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadInventories();
  }

  public loadInventories(): void {
    this.inventoryService.getAllInventories().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.inventories = response.data['inventories'];
          console.log(response);
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

  public onSubmit(): void {
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
