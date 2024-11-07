import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../model/order.model';

import { OrderStage } from '../model/enum/enums';
import { AuthService } from '../../authentication/auth.service';
import { OrderService } from '../order.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  // order: OrderModel = new OrderModel();
  // products: ProductModel[] = [];
  // errorMessage: string = '';
  // selectedProduct: ProductModel | null = null;

  constructor(
    // private authService: AuthService,
    // private orderService: OrderService,
    // private productService: ProductService,
    // private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.order.userId = this.authService.getUserProfileFromStorage()?.id!;
    // this.order.userName = this.authService.getUserProfileFromStorage()?.name!;
    // this.order.orderDate = new Date();
    //
    // if (!this.order.userId || !this.order.userName) {
    //   this.errorMessage = 'You must be logged in as a user to place an order.';
    //   return;
    }

  //   // Fetch available products
  //   this.productService.getProducts().subscribe({
  //     next: (products) => {
  //       this.products = products;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching products:', err);
  //       this.errorMessage = 'Failed to load products. Please try again later.';
  //     }
  //   });
  //
  //   // Check if there's a specific product selected from the route
  //   const productId = this.route.snapshot.params['productId'];
  //   if (productId) {
  //     this.productService.getProductById(productId).subscribe({
  //       next: (product) => {
  //         this.selectedProduct = product;
  //         this.updateProductDetails(product);
  //       },
  //       error: (err) => {
  //         console.error('Error fetching product:', err);
  //         this.errorMessage = 'Failed to load product details. Please try again later.';
  //       }
  //     });
  //   }
  // }
  //
  // updateProductDetails(product: ProductModel): void {
  //   this.order.product = product;
  //   this.order.unitPrice= product.price;
  //   this.order.stock = product.stock;
  //   this.calculateTotalPrice();
  // }
  //
  // calculateTotalPrice(): void {
  //   const quantity = this.order.quantity || 0;
  //   this.order.totalPrice = (this.order.product?.price || 0) * quantity;
  // }
  //
  // placeOrder(): void {
  //   if (this.validateOrder()) {
  //     this.order.status = OrderStage.PENDING; // Default status on order creation
  //     console.log("Order to be placed:", this.order);
  //
  //     this.orderService.placeOrder(this.order).subscribe({
  //       next: (res) => {
  //         console.log('Order placed successfully:', res);
  //         this.errorMessage = '';
  //         this.resetForm();
  //       },
  //       error: (err) => {
  //         console.error('Error placing order:', err);
  //         this.errorMessage = 'Failed to place order. Please try again.';
  //       }
  //     });
  //   } else {
  //     this.errorMessage = 'Please fill out all required fields correctly.';
  //   }
  // }
  //
  // validateOrder(): boolean {
  //   if (!this.order.userId || !this.order.userName || !this.order.phoneNumber || !this.order.address || !this.order.product || !this.order.quantity) {
  //     return false;
  //   }
  //   return true;
  // }
  //
  // resetForm(): void {
  //   this.order = new OrderModel();
  //   this.order.userId = this.authService.getUserProfileFromStorage()?.id!;
  //   this.order.userName = this.authService.getUserProfileFromStorage()?.name!;
  //   this.order.orderDate = new Date();
  //   this.selectedProduct = null;
  // }
}
