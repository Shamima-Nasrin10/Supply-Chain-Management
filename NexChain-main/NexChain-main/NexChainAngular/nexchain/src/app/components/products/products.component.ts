import { Component, OnInit } from '@angular/core';
import { Products } from '../../model/products.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products: Products[] = [];
  productForm: FormGroup;
  selectedImage: File | null = null;

  constructor(private productService: ProductsService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      batchNumber: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('description', this.productForm.value.description);
      formData.append('batchNumber', this.productForm.value.batchNumber);
      formData.append('price', String(this.productForm.value.price));
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
      this.productService.addProduct(formData).subscribe({
        next: (product) => {
          console.log('Product added successfully:', product);
          this.getAllProducts();
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding product:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.productForm.reset();
    this.selectedImage = null;
  }

}
