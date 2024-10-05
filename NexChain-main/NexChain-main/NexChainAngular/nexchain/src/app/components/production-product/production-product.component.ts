import { Component, OnInit } from '@angular/core';
import { ProductionProduct } from '../../model/production-product.model';
import { ProductionProductService } from '../../service/production-product.service';

@Component({
  selector: 'app-production-product',
  templateUrl: './production-product.component.html',
  styleUrl: './production-product.component.css'
})
export class ProductionProductComponent implements OnInit{


  products!: ProductionProduct[];
  newProductName: string = '';

  constructor(private productionProductService: ProductionProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productionProductService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(id: number | undefined): void {
    if (id !== undefined) {
      this.productionProductService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  addProduct(): void {
    if (this.newProductName.trim() !== '') {
      const newProduct: ProductionProduct = {
        productName: this.newProductName
      };
  
      this.productionProductService.createProduct(newProduct).subscribe(() => {
        this.newProductName = ''; // Clear the input field
        this.loadProducts(); // Reload the list of products
      });
    }
  }


}
