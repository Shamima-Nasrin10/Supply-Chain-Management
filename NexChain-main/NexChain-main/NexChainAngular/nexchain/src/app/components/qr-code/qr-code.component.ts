import { Component, Input, OnInit } from '@angular/core';
import { ProductWarehouseService } from '../../service/product-warehouse.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css'] // Use styleUrls instead of styleUrl
})
export class QrCodeComponent implements OnInit{

  qrCodeValue: string | undefined;
  @Input() productId: number | undefined;
  isStatusUpdated: boolean = false;
  buttonText: string = 'Update Status'; // Button text property


  constructor(private productService: ProductWarehouseService) { }

  ngOnInit(): void {
    this.qrCodeValue = history.state.qrCodeValue;
    this.productId = history.state.productId;
    // const updateStatusUrl = history.state.updateStatusUrl;

    
    console.log('QR Code Value:', this.qrCodeValue);
    console.log('Product ID:', this.productId);
  }


  updateProductStatus(): void {
    if (this.productId) {
      this.productService.updateProductStatus(this.productId).subscribe(
        response => {
          console.log('Status updated successfully:', response);
          this.isStatusUpdated = true; // Set the flag to true on successful update
          this.buttonText = 'Status Updated'; // Change button text
          // You can perform any additional actions here upon successful status update
        },
        error => {
          console.error('Error updating status:', error);
          // Handle error response here
        }
      );
    } else {
      console.error('Product ID is not provided.');
    }
  }


  getProductField(index: number): string {
    if (this.qrCodeValue) {
      const fields = this.qrCodeValue.split(',');
      if (fields.length > index) {
        return fields[index].trim();
      }
    }
    return ''; // Return empty string if the field is not found
  }
  
}
