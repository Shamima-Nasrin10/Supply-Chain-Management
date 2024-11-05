import { Component, OnInit } from '@angular/core';
import { RawMaterial, Unit } from '../model/raw-material.model';
import { SupplierModel } from '../../suppliers/model/supplier.model';
import { SupplierService } from '../../suppliers/supplier.service';
import { RawMaterialService } from '../raw-material.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyUtil } from '../../../util/notify.util';
import { RawMaterialCategory } from '../../raw-material-category/model/raw-material-category.model';
import { RawMaterialCategoryService } from '../../raw-material-category/raw-material-category.service';
import {Inventory} from "../../inventory/model/inventory.model";
import {InventoryService} from "../../inventory/inventory.service";

@Component({
  selector: 'app-raw-material-create',
  templateUrl: './raw-material-create.component.html',
  styleUrls: ['./raw-material-create.component.css']
})
export class RawMaterialCreateComponent implements OnInit {

  rawMaterial: RawMaterial = new RawMaterial();
  imageFile?: File;

  categories: RawMaterialCategory[] = [];
  suppliers: SupplierModel[] = [];
  inventories: Inventory[]=[];
  units = Object.values(Unit);

  rawMaterialId?: number;

  constructor(
    private supplierService: SupplierService,
    private rawMaterialService: RawMaterialService,
    private rawMaterialCategoryService: RawMaterialCategoryService,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRawMaterialCategories();

    this.rawMaterialId = this.route.snapshot.params['id'];
    if (this.rawMaterialId) {
      this.loadRawMaterial(this.rawMaterialId);
    }
  }

  // private loadRawMaterialSuppliers() {
  //   this.supplierService.getAllRawMaterialSuppliers().subscribe({
  //     next: apiResponse => {
  //       if (apiResponse && apiResponse.success) {
  //         this.suppliers = apiResponse.data['rawMaterialSuppliers'];
  //
  //       } else {
  //         NotifyUtil.error(apiResponse);
  //       }
  //     },
  //     error: apiResponse => {
  //       NotifyUtil.error(apiResponse);
  //     }
  //   });
  // }

  private loadRawMaterialCategories(): void {
    this.rawMaterialCategoryService.getAllRawMaterialCategories().subscribe({
      next: apiResponse => {
        if (apiResponse && apiResponse.success) {
          this.categories = apiResponse.data['categories'];

        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: (apiResponse) => {
        NotifyUtil.error(apiResponse);
      }
    });
  }

  // private loadInventories(): void {
  //   this.inventoryService.getAllInventories().subscribe({
  //     next: apiResponse => {
  //       if (apiResponse && apiResponse.success) {
  //         this.inventories = apiResponse.data['inventories'];
  //       } else {
  //         NotifyUtil.error(apiResponse.message);
  //       }
  //     },
  //     error: apiResponse => {
  //       NotifyUtil.error(apiResponse.message);
  //     }
  //   });
  // }


  private loadRawMaterial(id: number) {
    this.rawMaterialService.findRawMaterialById(id).subscribe({
      next: apiResponse => {
        if (apiResponse && apiResponse.success) {
          this.rawMaterial = apiResponse.data['rawMaterial'];
        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: error => {
        NotifyUtil.error(error);
      }
    });
  }

  onImagePicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
    }
  }

  onSubmit() {
    const rawMaterialObservable = this.rawMaterialId
      ? this.rawMaterialService.updateRawMaterial(this.rawMaterial, this.imageFile)
      : this.rawMaterialService.saveRawMaterial(this.rawMaterial, this.imageFile);

    rawMaterialObservable.subscribe({
      next: apiResponse => {
        if (apiResponse && apiResponse.success) {
          NotifyUtil.success(apiResponse);
          this.router.navigate(['/rawMaterial-list']);
        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: error => {
        NotifyUtil.error(error);
      }
    });
  }


  onImageChange(event: any) {
    this.imageFile = event.target.files[0];
  }
}
