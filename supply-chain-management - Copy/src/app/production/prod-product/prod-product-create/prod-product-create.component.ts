import {Component, OnInit} from '@angular/core';
import {ProdProduct, ProductionStatus} from "../prodproduct.model";
import {RawMatUsage} from "../../RawMatUsage/rawmatusage.model";
import {ProdProductService} from "../prod-product.service";
import {NotifyUtil} from "../../../util/notify.util";
import {ApiResponse} from "../../../util/api.response";
import {ProductService} from "../../../product/product.service";
import {RawMaterial} from "../../../inventory/raw-materials/model/raw-material.model";
import {Product} from "../../../product/model/product.model";
import {RawMaterialService} from "../../../inventory/raw-materials/raw-material.service";

@Component({
  selector: 'app-prod-product-create',
  templateUrl: './prod-product-create.component.html',
  styleUrl: './prod-product-create.component.css'
})
export class ProdProductCreateComponent implements OnInit{
  productionProduct: ProdProduct = new ProdProduct();
  rawMatUsage: RawMatUsage = new RawMatUsage();
  rawMatUsages: RawMatUsage[] = [];
  products: Product[] = [];
  rawMaterials: RawMaterial[] = [];
  statuses = Object.values(ProductionStatus);

  constructor(
    private prodProductService: ProdProductService,
    private productService: ProductService,
    private rawMaterialService: RawMaterialService) {}

  ngOnInit(): void {
    this.rawMatUsages = [];
    this.loadProducts();
    this.loadRawMaterials();
  }

  removeRawMatUsage(index: number): void {
    this.rawMatUsages.splice(index, 1);
  }

  saveProductionProduct(): void {
    this.productionProduct.rawMatUsages = this.rawMatUsages;
    this.prodProductService.saveProdProduct(this.productionProduct).subscribe({
      next: response => {
        if (response && response.success) {
          NotifyUtil.success(response);
          this.resetForm();
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }
  private loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (apiResponse: ApiResponse) => {
        if (apiResponse && apiResponse.success) {
          this.products = apiResponse.data['products'];
        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }
  private loadRawMaterials(): void {
    this.rawMaterialService.getAllRawMaterials().subscribe({
      next: (apiResponse: ApiResponse) => {
        if (apiResponse && apiResponse.success) {
          this.rawMaterials = apiResponse.data['rawMaterials'];
        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  addRawMatUsage(): void {
    // Ensure rawMatUsage is correctly defined with a new instance of RawMatUsage
    const newUsage = new RawMatUsage();
    newUsage.rawMaterial = new RawMaterial();  // Initialize rawMaterial property
    newUsage.quantity = 0;  // Default quantity, adjust as needed

    this.rawMatUsages.push(newUsage);
  }


  resetForm(): void {
    this.productionProduct = new ProdProduct();
    this.rawMatUsages = [];
    this.productionProduct.completionDate = null;
    this.productionProduct.movedToWarehouseDate = null;
  }

}
