import {Component, OnInit} from '@angular/core';
import {NotifyUtil} from "../../../util/notify.util";
import {SalesModel, SalesStatus} from "../model/sales.model";
import {SalesService} from "../sales.service";
import {ApiResponse} from "../../../util/api.response";
import {Retailer} from "../../../product/retailer/model/retailer.model";
import {RetailerService} from "../../../product/retailer/retailer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProdProduct} from "../../../production/prod-product/prodproduct.model";
import {ProdProductService} from "../../../production/prod-product/prod-product.service";

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrl: './sales-create.component.css'
})
export class SalesCreateComponent implements OnInit {

  sales: SalesModel = new SalesModel();
  salesStatusOptions = Object.values(SalesStatus);
  prodProducts: ProdProduct[] = [];
  retailers: Retailer[] = [];
  isEditMode = false;

  constructor(
    private salesService: SalesService,
    private router: Router,
    private route: ActivatedRoute,
    private prodProductService: ProdProductService,
    private retailerService: RetailerService,
  ) {}

  ngOnInit(): void {
    this.loadProdProducts();
    this.loadRetailers();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadSales(id);
    }
  }

  private loadProdProducts(): void {
    this.prodProductService.getAllProductionProducts().subscribe({
      next: (apiResponse: ApiResponse) => {
        if (apiResponse && apiResponse.success) {
          this.prodProducts = apiResponse.data['productionProducts'];
        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  private loadRetailers(): void {
    this.retailerService.getAllRetailers().subscribe({
      next: (apiResponse: ApiResponse) => {
        if (apiResponse && apiResponse.success) {
          this.retailers = apiResponse.data['productRetailers'];
        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  private loadSales(id: number): void {
    this.salesService.getSalesById(id).subscribe({
      next: (apiResponse: ApiResponse) => {
        if (apiResponse && apiResponse.success) {
          this.sales = apiResponse.data['sale'];
        } else {
          NotifyUtil.error(apiResponse);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  updateTotalPrice(): void {
    this.sales.totalPrice = this.sales.quantity * this.sales.unitPrice;
  }

  onSubmit(): void {
    this.updateTotalPrice();

    if (this.isEditMode) {
      this.salesService.updateSales(this.sales.id, this.sales).subscribe({
        next: (apiResponse: ApiResponse) => {
          if (apiResponse && apiResponse.success) {
            alert('Sales updated successfully!');
            this.router.navigate(['/sales-list']);
          } else {
            NotifyUtil.error(apiResponse);
          }
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    } else {
      this.salesService.saveSales(this.sales).subscribe({
        next: (apiResponse: ApiResponse) => {
          if (apiResponse && apiResponse.success) {
            alert('Sale created successfully!');
            this.router.navigate(['/sales-list']);
          } else {
            NotifyUtil.error(apiResponse);
          }
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }
}
