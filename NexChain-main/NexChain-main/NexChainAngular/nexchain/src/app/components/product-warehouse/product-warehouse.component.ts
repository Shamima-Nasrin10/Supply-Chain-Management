import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductWarehouseService } from '../../service/product-warehouse.service';
import { ProductWareHouse } from '../../model/product-warehouse.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-warehouse',
  templateUrl: './product-warehouse.component.html',
  styleUrl: './product-warehouse.component.css'
})
export class ProductWarehouseComponent {
  productForm: FormGroup; // Define FormGroup
  product: ProductWareHouse = {};
  qrCodeValue: string = '';
  productId: number | undefined; // Define productId variable

  constructor(private fb: FormBuilder, private productService: ProductWarehouseService ,private router:Router) { // Inject FormBuilder
    this.productForm = this.fb.group({ // Initialize the form
      productName: ['', Validators.required],
      batchNumber: ['', Validators.required],
      quantity: [null, Validators.required], // Assuming quantity is required and numeric
      workerName: ['', Validators.required],
      truckerName: ['', Validators.required],
      status: ['Pending Approval'] // Set default status
    });
  }

  async onSubmit() {
    if (this.productForm.valid) {
      const product: ProductWareHouse = this.productForm.value;
      this.productService.createProduct(product).subscribe(async (createdProduct) => {
        console.log('Product created successfully', createdProduct);
        this.product = createdProduct;
        this.qrCodeValue = this.generateQRCodeValue(product);
        
        // Check if id is defined before passing it to getUpdateStatusUrl
        // const updateStatusUrl = createdProduct.id ? this.getUpdateStatusUrl(createdProduct.id) : '';
        
        // Pass QR code value and URL to the QR code component

        // Set productId here
        this.productId = createdProduct.id;

        this.router.navigate(['/qr-code'], { state: { 
          qrCodeValue: this.qrCodeValue,
          productId: this.productId
          // updateStatusUrl: updateStatusUrl
        }});
      });
    } else {
      console.log('Form is invalid');
    }
  }

  generateQRCodeValue(product: ProductWareHouse): string {
    return `Product Name: ${product.productName}, Batch: ${product.batchNumber}, Quantity: ${product.quantity}, Worker: ${product.workerName}, Trucker: ${product.truckerName}`;
  }


//   getUpdateStatusUrl(productId: number): string {
//     // Assuming you're using ngrok URL for the update endpoint
//     return `https://30a5-103-205-69-5.ngrok-free.app/products/${productId}/approve`;
// }


// updateProductStatus(productId: number): void {
//   this.productService.updateStatus(productId).subscribe(() => {
//     console.log('Status updated successfully.');
//     // Optionally, you can perform any other actions here after successful update
//   }, error => {
//     console.error('Error updating status:', error);
//   });
// }

updateProductStatus(productId: number): void {
  this.productService.updateProductStatus(productId).subscribe(() => {
    console.log('Status updated successfully.');
    // Optionally, you can perform any other actions here after successful update
  }, error => {
    console.error('Error updating status:', error);
  });
}

}
