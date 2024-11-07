import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service"; // Import your Product service
import {Router} from "@angular/router";
import {Product} from "../model/product.model";
import {ApiResponse} from "../../util/api.response";
import {NotifyUtil} from "../../util/notify.util"; // Ensure correct import path

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  product: Product = new Product();
  imageFile?: File;
  isEditMode: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
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

  onImagePicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
    }
  }

  onSubmit(): void {
    const productObservable = this.isEditMode
      ? this.productService.updateProduct(this.product, this.imageFile)
      : this.productService.saveProduct(this.product, this.imageFile);

    productObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          NotifyUtil.success(response);
          this.resetForm();
          this.loadProducts();
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  editProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.product = response.data['product'];
          this.isEditMode = true;
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProductById(id).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.success) {
            NotifyUtil.success(response);
            this.loadProducts();
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

  resetForm(): void {
    this.product = new Product();
    this.imageFile = undefined;
    this.isEditMode = false;
  }

  addNewProduct(): void {
    this.resetForm();
    this.isEditMode = false;
  }
}
