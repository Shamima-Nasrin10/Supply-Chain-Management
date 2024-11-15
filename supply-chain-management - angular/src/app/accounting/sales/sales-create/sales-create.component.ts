import {Component, OnInit} from '@angular/core';
import {NotifyUtil} from "../../../util/notify.util";
import {Sales} from "../model/sales.model";
import {SalesService} from "../sales.service";
import {ApiResponse} from "../../../util/api.response";
import {Product} from "../../../product/model/product.model";
import {Retailer} from "../../../product/retailer/model/retailer.model";
import {RetailerService} from "../../../product/retailer/retailer.service";
import {ProductService} from "../../../product/product.service";

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrl: './sales-create.component.css'
})
export class SalesCreateComponent implements OnInit {

  sales: Sales = new Sales();
  products: Product[] = [];
  retailers: Retailer[] = [];

  constructor(private salesService: SalesService,
              private retailerService: RetailerService,
              private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.sales.product = [];
    this.loadProducts();
    this.loadRetailers();
  }
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.products = response.data['products'];
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

  // Fetch retailers from backend
  loadRetailers(): void {
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

  addProduct(): void {
    const product: Product = new Product();
    this.sales.product.push(product);
  }

  removeProduct(index: number): void {
    this.sales.product.splice(index, 1);
    // this.calculateTotalPrice();
  }

  // calculateTotalPrice(): void {
  //   let totalPrice = 0;
  //   this.sales.product.forEach((product) => {
  //     const quantity = product.quantity;
  //     const unitPrice = product.unitPrice;
  //     const discount = this.sales.discount;
  //     if (quantity >= 0 && unitPrice >= 0 && discount >= 0) {
  //       totalPrice += quantity * unitPrice * (1 - discount / 100);
  //     }
  //   });
  //   this.sales.totalprice = totalPrice;
  // }

  saveSales(): void {
    console.log(this.sales)
    this.salesService.saveSales(this.sales).subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
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

  // setProductDetails(productId: number): void {
  //   const product = this.products.find((p) => p.id === productId);
  //   if (product) {
  //     this.sales.product.forEach((p) => {
  //       if (p.id === productId) {
  //
  //       }
  //     });
  //   }
  // }

}
